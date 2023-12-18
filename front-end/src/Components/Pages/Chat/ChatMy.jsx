import { useState } from "react"

const ChatMy=()=>{

    let [messages,setMessages]=useState([])
    let [newmessage,setNewMessage]=useState('')

    return(

        <div>
            <form onSubmit={(e)=>{
                e.preventDefault();
             let chat={mess:newmessage}
             setMessages(chat)
            }} >
             <table>
                <tbody>
                   
                    <tr>
                        <td>
                            <td>
                                {messages && messages.map((mes,index)=>{
                                    return(
                                        <div key={index}>
                                            <h2>{mes.mess}</h2>
                                        </div>
                                    )
                                })}
                            </td>
           
                         
                            <input type="text" name="" id="" placeholder="entrer votre message"  onBlur={(e)=>{
                                setNewMessage(e.target.value)
                            console.log(newmessage)}}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="submit">Envoyer</button>
                        </td>
                    </tr>
                </tbody>
             </table>
            </form>
        </div>
    )


}

export default ChatMy;