import { gql, useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import CountryCard from "./CountryCard";
import { Country } from "@/types/country.type";
import styles from "@/styles/CountryList.module.css";
import { useRouter } from "next/router";

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

export default function CountryList() {
    const router = useRouter();
    const [countries, setCountries] = useState<Country[]>([]);

    const [addCountry] = useMutation(CREATE_COUNTRY);

    const { loading, error } = useQuery(GET_ALL_COUNTRIES, {
        onCompleted: (data) => {
            setCountries(data.countries);
        }
    })

    const submit = async (event: FormEvent) => {
        event.preventDefault();
        const form: EventTarget = event.target;
        const formData = new FormData(form as HTMLFormElement);

        const formDataJson = Object.fromEntries(formData.entries());
        console.log(formDataJson);

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

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error !</p>

    return (
        <>
            <div>
                <form onSubmit={submit}>
                    <label>
                        Name
                        <input type="text" name="name"/>
                    </label>
                    <label>
                        Emoji
                        <input type="text" name="emoji"/>
                    </label>
                    <label>
                        Code
                        <input type="text" name="code"/>
                    </label>
                    <button>Add</button>
                </form>
            </div>
            <section className={styles.listCountries}>
                {countries.length > 0 && countries.map((country: Country, index: number) => (
                    <div key={index}>
                        <CountryCard name={country.name} emoji={country.emoji} code={country.code} link={`/country/${country.code}`} />
                    </div>
                ))}
            </section>
        </>
    )
}