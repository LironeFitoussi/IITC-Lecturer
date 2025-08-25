'use client'

import { useFormStatus } from "react-dom"

export default function SubmitButton() {
    const status = useFormStatus();

    return (
        <button type="submit" disabled={status.pending}>
            {status.pending ?
                <span className="animate-spin"></span> :
                <span>Send Message</span>
            }
        </button>
    )
}