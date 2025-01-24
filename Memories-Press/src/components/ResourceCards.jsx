import React from 'react'
import CardList from './CardList';

const ResourceCards = () => {
  const title = 'Related resources that may be helpful to you.'
  const cards = [
    {
      title: 'Title 1',
      subtitle: 'Subtitle',
      cardColor: '#ffffff',
      buttonText: 'Enabled',
      onClick: () => alert('Card 1 clicked'),
    },
    {
      title: 'Title 2',
      subtitle: 'Subtitle',
      cardColor: '#ffffff',
      buttonText: 'Enabled',
      onClick: () => alert('Card 2 clicked'),
    },
    {
      title: 'Title 3',
      subtitle: 'Subtitle',
      cardColor: '#ffffff',
      buttonText: 'Enabled',
      onClick: () => alert('Card 3 clicked'),
    },
  ];

  return (
    <CardList cards={cards} title={title}/>
  )
}

export default ResourceCards