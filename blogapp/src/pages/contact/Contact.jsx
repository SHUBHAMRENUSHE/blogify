import './Contact.css'

export default function Contact() {
  const handleclick=()=>{
    alert("Details sent successfully!")
  }
  return (
    <>
    <div className='contact'>
      <h3>Contact Form</h3>

      <div className ="container">
         <form action="">
           <label for="fname">First Name</label>
            <input className='contacttext' type="text" id="fname" name="firstname" placeholder="Your firstname.."/><br/><br/>
            <label for="lname">Last Name</label>
            <input className='contacttext' type="text" id="lname" name="lastname" placeholder="Your last name.."/><br/><br/>

            <label for="pnumber">Phone no.</label>
            <input className='contacttext' type="number" id="pnumber" name="pnumber" placeholder="Your phone no..."/><br/><br/>

            <label for="email">E-mail</label>
            <input className='contacttext' type="text" id="email" name="email" placeholder="Your email.."/><br/><br/>

           <label for="subject">Subject</label>
            <textarea className='textsubject' id="subject" name="subject" placeholder="Write something.." ></textarea><br/><br/>

             <input type="submit" value="Submit" onClick={handleclick}/>
          </form>
     </div>
    </div>
    </>
    )
}
