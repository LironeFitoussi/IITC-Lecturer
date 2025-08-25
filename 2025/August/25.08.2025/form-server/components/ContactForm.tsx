'use client'

import { useActionState } from "react"
import { submitContactForm } from "@/actions/contact"
import SubmitButton from "./SubmitButton"

export default function ContactFrom() {   
    const [ state, action ] = useActionState(submitContactForm, null)
    return (
        <form action={action} className="flex flex-col gap-4 w-full max-w-md">
            <input name='name' placeholder="Name" />
            {state?.errors?.name && <p>{state?.errors?.name}</p>}
            <input name="email" type='email' placeholder="Email" />
            {state?.errors?.email && <p>{state?.errors?.email}</p>}
            <textarea name='content' placeholder="Type here your message..."/>
            <SubmitButton />
        </form>
    )
}