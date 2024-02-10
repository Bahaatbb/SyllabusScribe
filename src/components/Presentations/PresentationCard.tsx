import { Box, Button, Card, Flex, Menu, Modal, Text, rem } from '@mantine/core';
import { IconPresentation, IconDownload, IconX } from '@tabler/icons-react';
import React from 'react';
import { Points } from '../points';
import { useDisclosure } from '@mantine/hooks';

export const PresentationCard = ({ text, link }: { text: string; link?: string }) => {
  const handleDownload = () => {
    window.open(`${import.meta.env.VITE_API_URL}/${link}`);
  };
  const [opened, { open, close }] = useDisclosure(false);


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
      <Box fw={500} ta={'center'} fz={'sm'}>
        {/* {text} it should hold up to the width of the card */}
        <Box
          component="span"
          style={{
            display: 'block',
            maxWidth: rem(150),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </Box>
      </Box>
      <Flex align={'center'} gap={'sm'}>
        <IconDownload
          onClick={handleDownload}
          style={{
            cursor: 'pointer',
          }}
          size={30}
          color="#2951dc"
        />
      </Flex>
    </Card>
  );
};
