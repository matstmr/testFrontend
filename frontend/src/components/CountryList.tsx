import { gql, mergeOptions, useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState, useTransition } from "react";
import CountryCard from "./CountryCard";
import { Country } from "@/types/country.type";
import styles from "@/styles/CountryList.module.css";
import { useRouter } from "next/router";
import { Continent } from "@/types/continent.type";

const GET_ALL_COUNTRIES = gql`
    query Countries {
        countries {
        id
        name
        emoji
        code
        }
    }
`

const CREATE_COUNTRY = gql`
    mutation AddCountry($data: NewCountryInput!) {
            addCountry(data: $data) {
            id
            name
            emoji
            code
            continent {
                id
                name
            }
        }
    }
`

const GET_ALL_CONTINENTS = gql`
    query Query {
        continents {
            id
            name
        }
    }
`

export default function CountryList() {
    const router = useRouter();
    const [countries, setCountries] = useState<Country[]>([]);
    const [continents, setContinents] = useState<Continent[]>([]);
    const [selectedContinent, setSelectedContinent] = useState('');

    const [addCountry] = useMutation(CREATE_COUNTRY);

    const { loading, error } = useQuery(GET_ALL_COUNTRIES, {
        onCompleted: (data) => {
            setCountries(data.countries);
        }
    })

    const { loading: loadingContinents, error: errorContinents } = useQuery(GET_ALL_CONTINENTS, {
        onCompleted: (data) => {
            setContinents(data.continents)
        }
    })

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const form: EventTarget = event.target;
        const formData = new FormData(form as HTMLFormElement);

        const formDataJson = Object.fromEntries(formData.entries());
        console.log(formDataJson);

        if (!formDataJson.name || !formDataJson.emoji || !formDataJson.code) {
            throw new Error("Les champs ne sont pas correctement remplis !")
        }

        addCountry({
            variables: {
                data: {
                    name: formDataJson.name,
                    emoji: formDataJson.emoji,
                    code: formDataJson.code
                }
            },
            onCompleted: (data) => {
                setCountries([...countries, data.addCountry])
            }
        })
    }

     // Gestionnaire pour changer de sélection
     const handleChange = (event) => {
        console.log(event.target.value)
        setSelectedContinent(event.target.value);
    };

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error !</p>

    return (
        <>
            <div>
                <form onSubmit={submit} className={styles.form}>
                    <label className={styles.label}>
                        Name
                        <input type="text" name="name" className={styles.input} />
                    </label>
                    <label className={styles.label}>
                        Emoji
                        <input type="text" name="emoji" className={styles.input} />
                    </label>
                    <label className={styles.label}>
                        Code
                        <input type="text" name="code" className={styles.input} />
                    </label>
                    <label className={styles.label}>
                        <select name="continent" id="continent-select" value={selectedContinent} onChange={handleChange}>
                            <option value="">Select a continent</option>
                            {continents.map((continent) => (
                                <option key={continent.id} value={continent.id}>{continent.name}</option>
                            ))}
                        </select>
                    </label>
                    <button className={styles.button}>Add</button>
                </form>
            </div>
            <section className={styles.listCountries}>
                {countries.map((country: Country, index: number) => (
                    <div key={index}>
                        <CountryCard name={country.name} emoji={country.emoji} code={country.code} link={`/country/${country.code}`} />
                    </div>
                ))}
            </section>
        </>
    )
}