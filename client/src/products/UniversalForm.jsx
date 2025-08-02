import React, { useMemo, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Container, Typography, Box, Button } from '@mui/material';
import FieldRenderer from '../components/EditableSelect/FieldRenderer';
import fullParamsObject from './params-full';
import { transformParams } from '../components/EditableSelect/utils';

export default function UniversalForm() {
    const methods = useForm();
    const previousRefs = useRef({});

    const onSubmit = (data) => {
        console.log('Результаты формы:', data);
    };

    const paramsArray = useMemo(() => {
        return transformParams(fullParamsObject, previousRefs);
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>Цифровая печать</Typography>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {paramsArray.map(param => (
                        <Box key={param.key} sx={{ mb: 3 }}>
                            <FieldRenderer name={param.key} field={param} />
                        </Box>
                    ))}
                    <Button variant="contained" type="submit">Отправить</Button>
                </form>
            </FormProvider>
        </Container>
    );
}
