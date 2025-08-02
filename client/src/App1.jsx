import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container, Typography, Box, Button, TextField, Select, MenuItem,
    FormControlLabel, Checkbox, InputLabel, FormControl
} from '@mui/material';

export default function App() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [parameters, setParameters] = useState([]);
    const [form, setForm] = useState({});
    const [cache, setCache] = useState({});

    useEffect(() => {
        axios.get('/api/services').then(res => setServices(res.data));
    }, []);

    useEffect(() => {
        if (!selectedService) return;

        if (cache[selectedService]) {
            setParameters(cache[selectedService]);
            return;
        }

        axios.get(`/api/services/${selectedService}`).then(res => {
            const paramList = res.data.parameters || [];
            setParameters(paramList);
            setCache(prev => ({ ...prev, [selectedService]: paramList }));

            const defaultForm = {};
            for (let param of paramList) {
                defaultForm[param.name] = param.default || (param.type === 'checkbox' ? false : '');
            }
            setForm(defaultForm);
        });
    }, [selectedService]);

    const handleChange = (name, value) => {
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Калькулятор стоимости</Typography>

            <Box sx={{ mb: 3 }}>
                {services.map(service => (
                    <Button
                        key={service.key}
                        variant={selectedService === service.key ? 'contained' : 'outlined'}
                        sx={{ mr: 1, mb: 1 }}
                        onClick={() => setSelectedService(service.key)}
                    >
                        {service.title}
                    </Button>
                ))}
            </Box>

            {parameters.length > 0 && (
                <Box component="form" noValidate autoComplete="off" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {parameters.map(param => {
                        if (param.type === 'number') {
                            return (
                                <TextField
                                    key={param.name}
                                    label={param.label}
                                    type="number"
                                    value={form[param.name] || ''}
                                    onChange={e => handleChange(param.name, e.target.value)}
                                />
                            );
                        }

                        if (param.type === 'select') {
                            return (
                                <FormControl key={param.name} sx={{ minWidth: 120 }}>
                                    <InputLabel>{param.label}</InputLabel>
                                    <Select
                                        value={form[param.name] || ''}
                                        label={param.label}
                                        onChange={e => handleChange(param.name, e.target.value)}
                                    >
                                        {(param.options || []).map(opt => (
                                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            );
                        }

                        if (param.type === 'checkbox') {
                            return (
                                <FormControlLabel
                                    key={param.name}
                                    control={
                                        <Checkbox
                                            checked={!!form[param.name]}
                                            onChange={e => handleChange(param.name, e.target.checked)}
                                        />
                                    }
                                    label={param.label}
                                />
                            );
                        }

                        return null;
                    })}
                </Box>
            )}
        </Container>
    );
}
