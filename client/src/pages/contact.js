import { Tab } from '@nextui-org/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactUs = ({ onClose }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
                message: e.target.message.value,
            };
        
            // TODO: Code to handle the sending of email
            console.log('Form Data:', formData);
            e.target.reset();
    
    };
  return (
    <div >
      <div className="w-full ">
        <div className="p-2">

        <form className="mt-5 md:flex md:space-x-8"  onSubmit={handleSubmit}>
            
            <div className="md:w-1/2 flex flex-col justify-around space-y-4 pr-8 border-r border-gray-300">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" placeholder="John Smith" className="mt-1 block w-full px-3 py-2 bg-white border-b border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" placeholder="john.smith@example.com" className="mt-1 block w-full px-3 py-2 bg-white border-b border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500" />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" id="phone" placeholder="xxx-xxx-xxxx" className="mt-1 block w-full px-3 py-2 bg-white border-b border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500" />
                </div>
            </div>

            <div className="md:w-1/2 flex flex-col justify-between ">
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" placeholder="Write text here..." rows="5" className="mt-1 block w-full px-3 py-2 bg-white text-gray-700 focus:outline-none resize-none" style={{ minHeight: "250px" }}></textarea>
                </div>

                <div className="flex justify-end mt-4">
                    <button type="submit" className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm" style={{ width: 'auto' }}>
                        Submit
                    </button>
                </div>
            </div>

        </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
