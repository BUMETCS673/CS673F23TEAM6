import React from 'react';
import about_pic from '../Assets/user_image.jpg';

const About = ({ onClose }) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="w-full">
          <div className='grid md:grid-cols-3 gap-6 pb-2 font-semibold text-gray-800'>
                <div className='flex flex-col items-center p-4 shadow-lg'>
                    <img src= {about_pic} alt="Steve" style={{ width: '100px', height: '100px' }} border="0" />
                     <h3 className='text-md font-semibold'>Steve</h3>
                    <p class="text-xs text-gray-500 text-center">Team Lead</p>
                </div>

                <div className='flex flex-col items-center p-4 shadow-lg'>
                    <img src={about_pic} alt="Jeet" style={{ width: '100px', height: '100px' }} border="0"/>
                     <h3 className='text-md font-semibold'>Jeet</h3>
                    <p class="text-xs text-gray-500 text-center">requirement Lead</p>
                </div>

                <div className='flex flex-col items-center p-4 shadow-lg' >
                    <img src={about_pic} alt="Nick" style={{ width: '100px', height: '100px' }} border="0" />
                    <h3 className='text-md font-semibold'>Nick</h3>
                    <p class="text-xs text-gray-500 text-center">Frontend Lead</p>
                </div>

                <div className='flex flex-col items-center p-4 shadow-lg'>
                    <img src={about_pic} alt="Vedant" style={{ width: '100px', height: '100px' }} border="0" />
                     <h3 className='text-md font-semibold'>Vedant</h3>
                    <p class="text-xs text-gray-500 text-center">Design/Implementetion Lead</p>
                </div>

                <div className='flex flex-col items-center p-4 shadow-lg' >
                    <img src={about_pic} alt="Xanthus" style={{ width: '100px', height: '100px' }} border="0" />
                     <h3 className='text-md font-semibold'>Xanthus</h3>
                    <p class="text-xs text-gray-500 text-center">Devops Lead</p>
                </div>

                <div className='flex flex-col items-center p-4 shadow-lg' >
                    <img src={about_pic} alt="Nidhi" style={{ width: '100px', height: '100px' }} border="0" />
                     <h3 className='text-md font-semibold'>Nidhi</h3>
                    <p class="text-xs text-gray-500 text-center">QA Lead</p>
                </div>

                <div className='flex flex-col items-center p-4 shadow-lg'>
                    <img src={about_pic} alt="Aishwarya" style={{ width: '100px', height: '100px' }} border="0" />
                     <h3 className='text-md font-semibold'>Aishwarya</h3>
                    <p class="text-xs text-gray-500 text-center">Configuration Lead</p>
                </div>
            </div>
      </div>
    </div>
  );
};

export default About;
