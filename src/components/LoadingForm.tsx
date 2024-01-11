import { Box } from '@mantine/core';
import React from 'react';
import { Loader } from './Loader';

const LoadingForm: React.FC<{ loading: boolean; children?: React.ReactNode }> = ({
  loading,
  children,
}) => {
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {loading && (
        <Box
          display={'flex'}
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 20,
          }}
        >
          <Loader />
        </Box>
      )}
      <Box style={{ filter: loading ? 'blur(8px)' : 'none', flex: 1 }}>{children}</Box>
    </Box>
  );
};

export { LoadingForm };
