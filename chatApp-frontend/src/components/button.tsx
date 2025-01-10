interface ButtonProps {
    text:string,
    onClick:()=>void
}
export function Button(props:ButtonProps){
    return (
        <div className=" flex items-center justify-center px-10 rounded-md h-12 w-24 bg-blue-200 border-2">
            <button onClick={props.onClick}>{props.text}</button>
        </div>
    )
}