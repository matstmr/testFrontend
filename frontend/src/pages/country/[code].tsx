import { Country } from "@/types/country.type";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const GET_ONE_COUNTRY = gql`
    query Countries($code: String!) {
        country(code: $code) {
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

export default function OneCountryPage() {
    const router = useRouter();
    const { code } = router.query;
    const [oneCountry, setOneCountry] = useState<Country>();

    const [country, { loading, error }] = useLazyQuery(GET_ONE_COUNTRY, {
        variables: {
            code: String(code)
        },
        onCompleted: (data) => {
            console.log(data)
          setOneCountry(data.country)
        }
    })

    useEffect(() => {
        if (code) {
            country();
        }
      }, [code])

    return (
        <div>
            <p>{oneCountry?.emoji}</p>
            <p>Name : {oneCountry?.name} ({oneCountry?.code})</p>
            {oneCountry?.continent ? <p>Continent : {oneCountry.continent.name}</p> : ''}
        </div>
    )
}