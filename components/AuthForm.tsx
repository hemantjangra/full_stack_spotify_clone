import React, { useState, FC } from "react";
import { Box, Flex, Input, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import NextImage from 'next/image';


import {Auth} from '../lib/mutation';

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({mode}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      Auth(mode, email, password).then(res => {
        console.log(res)
        setIsLoading(false);
       router.push('/')
      });
    }catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex align="center" justify="center" height="100px" borderBottom="1px solid white" >
          <NextImage src='/logo.svg' alt="logo" height={60} width={120} />
      </Flex>
      <Flex align="center" justify="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="grey.900" borderRadius="6px">
          <form onSubmit={(e) => handleSubmit(e)}>
            <Input type="email"
                   placeholder="Email"
                   sx={{marginBottom: '10px'}}
                   onChange={(e) =>
                     setEmail(e.target.value)
                   }/>
            <Input type="password"
                   placeholder="Password"
                   sx={{marginBottom: '10px'}}
                   onChange={(e) =>
                     setPassword(e.target.value)}/>
            <Button type="submit" bg="green.500" isLoading={isLoading} sx={{
              '&:hover': {
                'bg': 'green.300'
              }
            }}
            >
              {mode.toUpperCase()}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm;