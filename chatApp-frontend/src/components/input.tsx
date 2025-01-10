interface InputProps {
    placeholder: string;
    reference: any
}

export function Input(props:InputProps){
    return (
        <div className="w-full h-12">
            <input className="w-full h-12 items-center bg-slate-200 rounded-md border-2" ref={props.reference} placeholder={props.placeholder} />
        </div>
    )
}   
