import { Box, Transition } from '@mantine/core';
import React, { useEffect, useRef } from 'react'; // Import useEffect and useRef
import { Loader } from './Loader';

const LoadingForm: React.FC<{ loading: boolean; children?: React.ReactNode }> = ({
  loading,
  children,
}) => {
  const loaderRef = useRef<HTMLDivElement>(null); // Create a ref for the loader

    if (loading && loaderRef.current) {
      loaderRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: '100%',
        position: 'relative',
      }}
    >
      <Transition mounted={loading} transition="fade" duration={600} timingFunction="ease">
        {(styles) => (
          <Box
            ref={loaderRef}
            style={{
              ...styles,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 20,
            }}
          >
            <Loader />
          </Box>
        )}
      </Transition>
      <Box
        style={{
          filter: loading ? 'blur(8px)' : 'none',
          width: '100%',
          transition: 'filter 0.6s ease',
          flexGrow: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export { LoadingForm };
