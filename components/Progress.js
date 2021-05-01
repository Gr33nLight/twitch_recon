import React, { useEffect } from 'react';
import { FaAngleRight, FaCheck } from 'react-icons/fa';
import { Box } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';

const Progress = ({ result, loading }) => {
  const controls = useAnimation();

  useEffect(() => {
    sequence();
  }, [loading]);

  async function sequence() {
    await controls.start((i) => ({
      opacity: 0.5,
      transition: { delay: i * 0.3, repeat: Infinity, duration: 1.2 },
    }));
  }

  const loadingStyle = {
    height: '40px',
  };

  if (result) {
    return (
      <Box px="8px" display="inline-flex" alignItems="center">
        Success
        <FaCheck
          fontSize="1.5em"
          color="green"
          style={{
            marginLeft: '3px',
          }}
        />
      </Box>
    );
  } else if (loading) {
    return (
      <Box
        px="5px"
        display="inline-flex"
        alignItems="center"
        flexDirection="row"
      >
        <motion.div animate={controls} custom={0} initial={{ opacity: 1 }}>
          <FaAngleRight style={loadingStyle} />
        </motion.div>
        <motion.div animate={controls} custom={1} initial={{ opacity: 1 }}>
          <FaAngleRight style={loadingStyle} />
        </motion.div>
        <motion.div animate={controls} custom={2} initial={{ opacity: 1 }}>
          <FaAngleRight style={loadingStyle} />
        </motion.div>
      </Box>
    );
  } else {
    return (
      <Box px="5px" display="inline-flex" alignItems="center">
        Sync To
        <FaAngleRight style={{ height: '18px', marginLeft: '3px' }} />
      </Box>
    );
  }
};

export default Progress;
