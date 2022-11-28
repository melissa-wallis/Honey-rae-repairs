/* for ticket search bar */

//the value of setterFunction variable = the value of the setSearchTerms function in the parent component (Ticket Container)
export const TicketSearch = ({setterFunction}) => {
    return (
        <div>
        <input
            onChange={
                (changeEvent) => {
                    setterFunction(changeEvent.target.value)
                }
            }
        type="text" placeholder="Enter search terms" />

        </div>

    )
}