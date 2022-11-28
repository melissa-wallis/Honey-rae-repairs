//this component serves to contain both TicketList and TicketSearch so that they can  share state. Sibling components cannot talk directly to each other without going through a parent

import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"

//parent component that will maintain the state. Returns both components. Because setterFunction and searchTermState (props) are sibling components, they cannot send state to each other directly (aka interact with each other), must be under a parent component. 
export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <TicketSearch setterFunction={setSearchTerms} />
        <TicketList searchTermState={searchTerms}/>
    </>
}