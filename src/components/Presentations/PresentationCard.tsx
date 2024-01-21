import { Box, Card, Text, rem } from '@mantine/core';
import { IconPresentation, IconDownload } from '@tabler/icons-react';
import React from 'react';

export const PresentationCard = ({ text, link }: { text: string; link?: string }) => {
  const handleDownload = () => {
    window.open(`http://localhost:8000/${link}`);
  };

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      shadow="sm"
      withBorder={true}
      p="lg"
      radius="md"
    >
      <IconPresentation color="#f3b200" size={30} />
      <Text fw={500} ta={'center'} fz={'sm'}>
        {/* {text} it should hold up to the width of the card */}
        <Box
          component="span"
          style={{
            display: 'block',
            maxWidth: rem(200),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </Box>
      </Text>
      <IconDownload
        onClick={handleDownload}
        style={{
          cursor: 'pointer',
        }}
        size={30}
        color="#2951dc"
      />
    </Card>
  );
};
