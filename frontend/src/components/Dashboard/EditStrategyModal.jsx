import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, HStack, Text } from '@chakra-ui/react';

const EditStrategyModal = ({ isOpen, onClose, strategy, onSave }) => {
  const [localAlloc, setLocalAlloc] = useState({ ...strategy.allocations });

  const handleSlider = (key, val) => {
    const rest = Object.keys(localAlloc).filter(k => k !== key);
    const restSum = rest.reduce((s, k) => s + localAlloc[k], 0);
    const remaining = 100 - val;
    const factor = remaining / restSum;
    const newAlloc = { ...localAlloc, [key]: val };
    rest.forEach(k => newAlloc[k] = Math.round(localAlloc[k] * factor));
    setLocalAlloc(newAlloc);
  };

  const save = () => {
    onSave({ ...strategy, allocations: localAlloc });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Allocation Strategy</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {Object.entries(localAlloc).map(([key, val]) => (
            <Box key={key} mb={4}>
              <HStack justify="space-between"><Text textTransform="capitalize">{key}</Text><Text>{val}%</Text></HStack>
              <Slider value={val} onChange={(v)=>handleSlider(key,v)}>
                <SliderTrack><SliderFilledTrack /></SliderTrack><SliderThumb />
              </Slider>
            </Box>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>Cancel</Button>
          <Button colorScheme="brand" onClick={save}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditStrategyModal;