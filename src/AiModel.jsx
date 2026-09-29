import { useContext } from "react"
import { Context } from "./Context"
import "./AiModel.css"

export default function AiModel() {
    const {setOpen} = useContext(Context);
    return (
        <div className="flex items-center justify-center mr-2">
            <div className="rounded model-behave transition ease-in-out p-2" onClick={() => setOpen(true) }>
                <i className="fa-solid !text-blue-500 fa-retweet"></i>
            </div>
        </div>
    )
}