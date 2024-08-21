const ContactUs = () => {
    return (
        <div className="contact-us">
            <h1 className="font-bold p-4 m-4 text-3xl">Contact-us</h1>
            <form className="p-3 m-3">
                <input
                 type="text"
                 placeholder="Name"
                 className="border border-black m-2 p-2"
                />
                <input
                 type="text" 
                 placeholder="message" 
                 className="border border-black m-2 p-2" 
                />
                <button
                 className="border border-black m-2 p-2 bg-gray-300">
                 Submit
                </button>
            </form>
        </div>
    );
}

export default ContactUs;