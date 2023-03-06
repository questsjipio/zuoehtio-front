import { useForm, useFieldArray } from 'react-hook-form';

export default function FieldArrayTryout() {
    type FormValues = {
        cart: {
            name: string;
            type: number;
            amount: number;
        }[]
    }

    const { register, control, handleSubmit } = useForm<FormValues>( {
        defaultValues: {
            cart: [{name: "DEFAULT NAME", type: 20, amount: 1000 }]
        }
    } );
    const { fields, append, remove } = useFieldArray ({
        control,
        name: 'cart'
    })

    return <form onSubmit={handleSubmit(console.log)}>
        {fields.map(( { id, name, type, amount }, index ) => {
            return <div key={id} >
                <input 
                    {...register(`cart.${index}.name` as const)}
                    defaultValue={name}
                />
                <select 
                    {...register(`cart.${index}.type` as const)}
                    defaultValue={type}
                >
                    <option value={10}>Item A</option>
                    <option value={20}>Item B</option>
                    <option value={30}>Item C</option>
                </select>
                <input 
                    {...register(`cart.${index}.amount` as const)}
                    type="number" 
                    defaultValue={amount}
                />
                <button type="button" onClick={() => remove(index)}>Remove</button>
            </div>
        })}
        <input type="submit" />
        <button type="button" onClick={() => append({ name: "", type: 10, amount: 0})}>
            Append
        </button>
    </form>
}