interface InputProps {
    placeholder: string;
    reference: any
}

export function Input(props:InputProps){
    return (
        <div className="w-full h-12">
            <input className="w-full h-12 items-center bg-slate-300 rounded-md " ref={props.reference} placeholder={props.placeholder} />
        </div>
    )
}   
