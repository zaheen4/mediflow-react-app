import React from "react";
// import "../../style.css"; // Ensure you have a separate CSS file for styling


import zaheen from "../../assets/images/zaheen.jpg";
import sahil from "../../assets/images/sahil.jpg";
import arafath from "../../assets/images/arafath.jpg";
import fatin from "../../assets/images/fatin.jpg";
import healthtech from "../../assets/images/healthtech.jpg";


const About = () => {
   return (
      <div className="inter_font">

         <div className="w-[70%] mx-auto p-10 my-10 ">
            <section className="display_flex my-10">
               <div className="section_title">
                  <h6 className="zero_margin text-4xl">
                     MediFlow offers you the best medical equipment and treatment for your life.
                  </h6>
               </div>
               <div className="little_style">
                  <h3>
                     Our team has only one goal: to create an environment where medical equipment is within everyone’s reach.
                     "Every single one of us deserves access to quality, affordable health care."
                  </h3>
               </div>
            </section>

            <section>
               <div>
                  <img src={healthtech} alt="Healthtech" width="100%" />
               </div>
            </section>
         </div>

         <section className="team_container">

            <div className="text-center my-8">
               <h2 className="section_title">Meet Our Team</h2>
               <p className="section_description">
                  We believe treatment should be accessible to everyone, everywhere, regardless of income and class.
               </p>
            </div>
            <div className="mx-auto flex justify-center items-center">
               {/* <div className="team_content">
               </div> */}

               <div className="mb-20 w-[70%] grid grid-cols-2 gap-4 bg-base-300 px-32 py-26 rounded-2xl">
                  {[
                     { name: "Fatin Hasan", id: "CS-2203094", image: fatin },
                     { name: "Mir Zaheen Waseet", id: "CS-2203104", image: zaheen },
                     { name: "Towsif Abrar Sahil", id: "CS-2203086", image: sahil },
                     { name: "Mohammed Arafath Rahman", id: "CS-2203079", image: arafath },
                  ].map((member, index) => (
                     <div key={index} className={`relative rounded-xl student student_${index + 1}`} style={{ backgroundImage: `url(${member.image})`, backgroundSize: 'cover', width: '400px', height: '400px' }}>
                        <div className='absolute top-85 left-2 text-white '>
                           <h4 className='text-lg font-bold'>{member.name}</h4>
                           <p className=' font-semibold'>{member.id}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
};

export default About;
