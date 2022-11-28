/*
useState is a react function that STORES the state in a component, it returns an array. The array contains the initial state value at index 0 and a function that modifies the state at index 1. You then deconstruct those values into two variables e.g. [tickets, setTickets].

When the code runs, your variables will have new values:
tickets = empty array 
setTickets = function THE SETTER FUNCTION UPDATES THE DATA IN THE EMPTY ARRAY

THIS IS THE INITIAL CHANGE OF STATE IN A COMPONENT

--- 

useEffect is a react function that lets you OBSERVE state in a component and run instructions when the state changes.
*/

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Tickets.css"

//take permenant state in a remote API, pull the state into this component and update the appropriate state variable
//the value of searchTermState is the state from the ticketContainer parent
export const TicketList = ({searchTermState}) => {
    const [tickets, setTickets] = useState([]) //all tickets ORIGINAL STATE
    const [filteredTickets, setFiltered] = useState([]) //filtered tickets based user interaction THIS IS THE STATE BEING DISPLAYED
    const [emergency, setEmergency] = useState(false) //for emergency ticket button, default state is false (shows all tickets, not just emergencies) when emergency only button is clicked, state changes to true and displays only emergency tickets)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user") //get honeyUser object out of local storage, return as a string
    const honeyUserObject = JSON.parse(localHoneyUser) //makes variable above an object so we can use it. this is an oject with two properties: id and staff
    

//observes searchTermState, filters and displays tickets based on what is entered in search field. toLowerCase both on description object itself and search terms so that they will always match
    useEffect (
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedTickets)
        },
        [searchTermState]
    )
    




    //this useEffect hook observes emergency state, if emergency is true
    useEffect(
        () => {
        if (emergency) {
            const emergencyTickets = tickets.filter(ticket => ticket.emergency === true) //all emergency tickets
            setFiltered(emergencyTickets) //update the state variable that is being DISPLAYED because that state variable is what we're seeing in browser. Update its state to emergency tickets
        }
        else {
            setFiltered(tickets) //otherwise display all tickets
        }
    },
    [emergency] // <-- state we want to observe
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/serviceTickets`) // go get all tickets from here
                .then(response => response.json()) // get the response back, turn it into a JS array
                .then((ticketArray)=> { 
                    setTickets(ticketArray) //implement setter function and update ticketArray parameter with all tickets info (ticketArray is a placeholder for tickets variable, anything you pass as an argument into setTickets function will update the tickets variable because setTickets is a function that updates the state of tickets!!!
                })
        },
        [] // When this array is empty, you are observing initial component state
    )
    

    //Show tickets based on who is logged in - foreign key of ticket must match currently logged in user
    //if staff member, we want to see all tickets. setFiltered MODIFIES what is in filteredTickets state variable
    //if customer, only objects with matching ticket userId and honeyUserObject.id will go into myTickets array and update filteredTickets state variable using setFiltered function
    useEffect(
        () => {
            if (honeyUserObject.staff) {
                setFiltered(tickets)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

    // if openOnly is true, ticket is assigned to user signed in and the date completed is an empty string, update state variable and show open uncompleted tickets. Otherwise, update state variable back to false and show all tickets
    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [openOnly]
    )


    //below is JSX to display the HTML representation of the tickets. In react, interpolation does not require dollar sign
    //first ternary statement only shows emergency only button if person logged in is an employee
    //first button sets emergency state to true
    //second button sets emergency state to false
    //third button: when clicked changes the route to ticket/create
    
    return( <>
    {
        honeyUserObject.staff
        ? <>
            <button onClick={ () => {setEmergency(true)} } >Emergency Only</button> 
            <button onClick={ () => {setEmergency(false)} } >Show All</button>
            </>
            : <> 
            <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
            <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
            <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
            </>
    }
    

    <h2>List of Tickets</h2>

    <article className="tickets">
        {
            filteredTickets.map( //filteredTickets (our second state variable) is either all the tickets or a subset of the tickets based on who is logged in
                (ticket) => { //callback function
                    return <section key={ticket.id} className="ticket">
                        <header>{ticket.description}</header>
                        <footer>Emergency: {ticket.emergency ? "Yes" : "No"}</footer>
                    </section>
                }
            )
        }
    </article>
    </>)
}
