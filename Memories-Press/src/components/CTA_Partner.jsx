import React from 'react';
import SplitContent from './SplitContent';

function CTA_Partner() {
  return (
    <SplitContent 
      imageSrc="./heart.png"
      heading="Partner with Memories Press"
      subheading="Are you a funeral home or florist in the Stafford, VA area interested in being featured on our partners' list? Reach out to us to discuss collaboration opportunities and how we can work together to support families during difficult times."
      buttonText="Send us a message"
      onButtonClick={() => alert('Message Sent.')}
      stacked={true}
      buttonWidthMobile="auto"
    />
  );
}

export default CTA_Partner;