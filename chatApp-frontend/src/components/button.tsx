interface ButtonProps {
    text:string,
    onClick:()=>void
}
export function Button(props:ButtonProps){
    return (
        <div className=" flex items-center cursor-pointer  justify-center px-10 rounded-md h-12 w-24 bg-slate-500">
            <button onClick={props.onClick}>{props.text}</button>
        </div>
    )
}