import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import CountryCard from "./CountryCard";
import { Country } from "@/types/country.type";
import styles from "@/styles/CountryList.module.css";

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

export default function CountryList() {
    const [countries, setCountries] = useState<Country[]>([]);

    const { loading, error } = useQuery(GET_ALL_COUNTRIES, {
        onCompleted: (data) => {
            setCountries(data.countries);
        }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error !</p>

    return (
        <section className={styles.listCountries}>
            {countries.length > 0 && countries.map((country: Country, index: number) => (
                <div key={index}>
                    <CountryCard name={country.name} emoji={country.emoji} code={country.code} link={`/country/${country.id}`} />
                </div>
            ))}
        </section>
    )
}