import React,{useState} from 'react';
import about_pic from '../Assets/user_image.jpg';

const About = () => {

    const [hover, setHover] = useState({});

    const handleMouseEnter = (name) => {
        setHover({ ...hover,[name]: true });
    };

    const handleMouseLeave = (name) => {
        setHover({ ...hover,[name]: false });
    };

    const getCardStyle = (name) => ({
        boxShadow: hover[name] ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
        transform: hover[name] ? 'scale(1.05)' : 'scale(1)',
        transition: 'all 0.3s ease-in-out'
    });

  return (
    <div className="max-w-md mx-auto">
      <div className="w-full">
          <div className='grid md:grid-cols-3 gap-6 pb-2 font-semibold text-gray-800'>
                <div 
                    className='flex flex-col items-center p-4 shadow-lg'
                    onMouseEnter={() => handleMouseEnter('Steve')}
                    onMouseLeave={() => handleMouseLeave('Steve')}
                    style={getCardStyle('Steve')}
                    >
                    <img src= {about_pic} alt="Steve" style={{ width: '100px', height: '100px' }} />
                     <h3 className='text-md font-semibold'>Steve</h3>
                    <p class="text-xs text-gray-500 text-center">Team Lead</p>
                </div>

                <div 
                    className='flex flex-col items-center p-4 shadow-lg'
                    onMouseEnter={() => handleMouseEnter('Jeet')}
                    onMouseLeave={() => handleMouseLeave('Jeet')}
                    style={getCardStyle('Jeet')}
                    >
                    <img src={about_pic} alt="Jeet" style={{ width: '100px', height: '100px' }} border="0"/>
                     <h3 className='text-md font-semibold'>Jeet</h3>
                    <p class="text-xs text-gray-500 text-center">requirement Lead</p>
                </div>

                <div 
                    className='flex flex-col items-center p-4 shadow-lg' 
                    onMouseEnter={() => handleMouseEnter('Nick')}
                    onMouseLeave={() => handleMouseLeave('Nick')}
                    style={getCardStyle('Nick')}
                    >
                    <img src={about_pic} alt="Nick" style={{ width: '100px', height: '100px' }} border="0" />
                    <h3 className='text-md font-semibold'>Nick</h3>
                    <p class="text-xs text-gray-500 text-center">Frontend Lead</p>
                </div>

                <div 
                    className='flex flex-col items-center p-4 shadow-lg'
                    onMouseEnter={() => handleMouseEnter('Vedant')}
                    onMouseLeave={() => handleMouseLeave('Vedant')}
                    style={getCardStyle('Vedant')}
                    >
                    <img src={about_pic} alt="Vedant" style={{ width: '100px', height: '100px' }} border="0" />
                     <h3 className='text-md font-semibold'>Vedant</h3>
                    <p class="text-xs text-gray-500 text-center">Design/Implementetion Lead</p>
                </div>

                <div   
                    className='flex flex-col items-center p-4 shadow-lg' 
                    onMouseEnter={() => handleMouseEnter('Xanthus')}
                    onMouseLeave={() => handleMouseLeave('Xanthus')}
                    style={getCardStyle('Xanthus')}
                    >
                    <img src={about_pic} alt="Xanthus" style={{ width: '100px', height: '100px' }} border="0" />
                     <h3 className='text-md font-semibold'>Xanthus</h3>
                    <p class="text-xs text-gray-500 text-center">Devops Lead</p>
                </div>

                <div 
                    className='flex flex-col items-center p-4 shadow-lg' 
                    onMouseEnter={() => handleMouseEnter('Nidhi')}
                    onMouseLeave={() => handleMouseLeave('Nidhi')}
                    style={getCardStyle('Nidhi')}
                    >
                    <img src={about_pic} alt="Nidhi" style={{ width: '100px', height: '100px' }} border="0" />
                     <h3 className='text-md font-semibold'>Nidhi</h3>
                    <p class="text-xs text-gray-500 text-center">QA Lead</p>
                </div>

                <div 
                    className='flex flex-col items-center p-4 shadow-lg'
                    onMouseEnter={() => handleMouseEnter('Aishwarya')}
                    onMouseLeave={() => handleMouseLeave('Aishwarya')}
                    style={getCardStyle('Aishwarya')}    
                    >
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
