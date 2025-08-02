import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    MenuItem,
    ListSubheader,
    FormControl,
    InputLabel,
    Select,
    TextField,
    Typography,
    FormHelperText,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

export default function EditableSelect({ name, config }) {
    const {
        label = 'Выбор',
        fields = [],
        fieldLabels = {},
        fieldValidation = {},
        layout = 'inline',
        groupedOptions = [],
        defaultValue = '',
        onChange = () => {},
        getPreviousDefaults = null,
    } = config;

    const {
        control,
        setValue,
        watch,
        formState: { errors },
    } = useFormContext();

    const hasInitialized = useRef(false);
    const selectedLabel = watch(name);
    const [lastSelectedValues, setLastSelectedValues] = useState({});
    const isCustom = selectedLabel === 'custom';

    const customFieldValues = {};
    fields.forEach((field) => {
        customFieldValues[field] = watch(`${name}_${field}`) || '';
    });

    // Инициализация defaultValue
    useEffect(() => {
        if (!hasInitialized.current && defaultValue) {
            hasInitialized.current = true;
            setValue(name, defaultValue);

            const found = groupedOptions.flatMap((g) => g.options).find((opt) => opt.label === defaultValue);
            if (found?.values) {
                fields.forEach((f) => setValue(`${name}_${f}`, found.values[f] || ''));
                setLastSelectedValues(found.values);
                onChange(found.values, { setCustomDefaults: setLastSelectedValues });
            }
        }
    }, [defaultValue]);

    const handleSelectChange = (e, fieldOnChange) => {
        const selected = e.target.value;
        fieldOnChange(selected);
        const found = groupedOptions.flatMap((g) => g.options).find((opt) => opt.label === selected);

        if (found?.values) {
            fields.forEach((f) => {
                setValue(`${name}_${f}`, found.values[f] || '');
            });
            setLastSelectedValues(found.values);
            onChange(found.values, { setCustomDefaults: setLastSelectedValues });
        } else if (selected === 'custom' && getPreviousDefaults) {
            const previous = getPreviousDefaults();
            fields.forEach((f) => setValue(`${name}_${f}`, previous[f] || ''));
            onChange(previous, { setCustomDefaults: setLastSelectedValues });
        } else {
            fields.forEach((f) => setValue(`${name}_${f}`, ''));
            onChange({}, { setCustomDefaults: setLastSelectedValues });
        }
    };

    const handleFieldChange = (field, value) => {
        const numeric = parseFloat(value);
        const { min, max } = fieldValidation[field] || {};
        const error =
            value === ''
                ? 'Обязательно'
                : isNaN(numeric)
                    ? 'Введите число'
                    : min && numeric < min
                        ? `Минимум ${min}`
                        : max && numeric > max
                            ? `Максимум ${max}`
                            : '';

        setValue(`${name}_${field}`, value, { shouldValidate: true });
        const updated = { ...customFieldValues, [field]: value };

        if (!error) {
            onChange(updated, { setCustomDefaults: setLastSelectedValues });
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth error={!!errors[name]}>
                <InputLabel>{label}</InputLabel>
                <Controller
                    name={name}
                    control={control}
                    rules={{ required: 'Обязательно' }}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label={label}
                            value={selectedLabel || ''}
                            onChange={(e) => handleSelectChange(e, field.onChange)}
                        >
                            {groupedOptions.map((group) => [
                                <ListSubheader key={group.group}>{group.group}</ListSubheader>,
                                ...group.options.map((opt) => (
                                    <MenuItem key={opt.label} value={opt.label}>
                                        {opt.label}
                                    </MenuItem>
                                )),
                            ])}
                            <ListSubheader>Другое</ListSubheader>
                            <MenuItem value="custom">Свои значения</MenuItem>
                        </Select>
                    )}
                />
                <FormHelperText>{errors[name]?.message}</FormHelperText>
            </FormControl>

            {isCustom && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: layout === 'inline' ? 'row' : 'column',
                        gap: 2,
                    }}
                >
                    {fields.map((field) => (
                        <Controller
                            key={field}
                            name={`${name}_${field}`}
                            control={control}
                            rules={{
                                required: 'Обязательно',
                                min: {
                                    value: fieldValidation[field]?.min || 0,
                                    message: `Минимум ${fieldValidation[field]?.min}`,
                                },
                                max: {
                                    value: fieldValidation[field]?.max || 10000,
                                    message: `Максимум ${fieldValidation[field]?.max}`,
                                },
                            }}
                            render={({ field: f }) => (
                                <TextField
                                    {...f}
                                    label={fieldLabels[field] || field}
                                    type="number"
                                    error={!!errors[`${name}_${field}`]}
                                    helperText={errors[`${name}_${field}`]?.message}
                                    onChange={(e) => {
                                        f.onChange(e);
                                        handleFieldChange(field, e.target.value);
                                    }}
                                />
                            )}
                        />
                    ))}
                </Box>
            )}

            <Typography variant="body2" sx={{ mt: 1 }}>
                Выбрано: {selectedLabel}{' '}
                {fields.map((f) =>
                    customFieldValues[f]
                        ? `| ${fieldLabels[f] || f}: ${customFieldValues[f]} `
                        : ''
                )}
            </Typography>
        </Box>
    );
}
