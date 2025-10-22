import useAddJoke from "../hooks/useAddJoke";
import type { JokeDTO } from "../types";


function NewJokeForm() {
    const { mutate, isPending, isSuccess, isError, reset } = useAddJoke();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.currentTarget)) as JokeDTO;
        console.log(data);
        mutate(data);
        // Reset form fields after successful submission
        if (!isPending && !isError) {
            resetFormFields(e.currentTarget);
        }

        // Wait 3 seconds before resetting the form fields
        setTimeout(() => {
           reset()
        }, 3000);
    };

    let btnContent = ''

    switch (true) {
        case isPending:
            btnContent = 'Sending Joke';
            break;
        case isSuccess:
            btnContent = 'Joke send Succefully';
            break;
        case isError:
            btnContent = 'an error occured while sending the form';
            break;
        default:
            btnContent = 'Send Joke';
    }

    function resetFormFields(form: HTMLFormElement) {
        form.reset();
    }

    return (
        <div>
            <form
                className="joke-form"
                onSubmit={(e) =>handleSubmit(e)}
            >
                <h2 className="joke-form-title">Submit a New Joke</h2>
                <label className="joke-form-label">
                    Content
                    <input
                        className="joke-form-input"
                        type="text"
                        name="content"
                        placeholder="Content"
                        required
                    />
                </label>
                <label className="joke-form-label">
                    Punchline
                    <input
                        className="joke-form-input"
                        type="text"
                        name="punchline"
                        placeholder="Punchline"
                        required
                    />
                </label>
                <label className="joke-form-label">
                    Author
                    <input
                        className="joke-form-input"
                        type="text"
                        name="author"
                        placeholder="Author"
                        required
                    />
                </label>
                <button className={`joke-form-button ${(isPending || isSuccess) && 'greyed'}`} type="submit" disabled={isPending || isSuccess}>{btnContent}</button>
            </form>
        </div>
    );
}

export default NewJokeForm;