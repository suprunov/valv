import React from 'react';
import {
    FormControl, FormLabel, FormHelperText,
    TextField, Checkbox, Select, MenuItem, InputLabel,
    Tooltip, Box
} from '@mui/material';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import EditableSelect from './EditableSelect';

export default function FieldRenderer({ name, field }) {
    const { control } = useFormContext();

    const watchFields = [
        ...(field.hideIf?.map(c => c.field) || []),
        ...(field.disableIf?.map(c => c.field) || [])
    ];
    const allValues = useWatch({ name: watchFields });

    const hidden = field.hideIf?.some(condition => {
        return allValues?.[condition.field] === condition.equals;
    });

    const disabled = field.disableIf?.some(condition => {
        return allValues?.[condition.field] === condition.equals;
    });

    if (hidden) return null;

    const Wrap = field.tooltip
        ? ({ children }) => <Tooltip title={field.tooltip}>{children}</Tooltip>
        : ({ children }) => <>{children}</>;

    if (field.type === 'custom-select') {
        return (
            <Wrap>
                <Box sx={{ opacity: disabled ? 0.5 : 1, pointerEvents: disabled ? 'none' : 'auto' }}>
                    <EditableSelect name={name} config={field.config} />
                </Box>
            </Wrap>
        );
    }

    if (field.type === 'select') {
        return (
            <Wrap>
                <FormControl fullWidth sx={{ mt: 2 }} disabled={disabled}>
                    <InputLabel>{field.title}</InputLabel>
                    <Controller
                        name={name}
                        control={control}
                        defaultValue={field.default || ''}
                        render={({ field: f }) => (
                            <Select {...f} label={field.title}>
                                {Object.entries(field.options).map(([key, opt]) => (
                                    <MenuItem key={key} value={key}>{opt.title}</MenuItem>
                                ))}
                            </Select>
                        )}
                    />
                    {field.description && <FormHelperText>{field.description}</FormHelperText>}
                </FormControl>
            </Wrap>
        );
    }

    if (field.type === 'number') {
        return (
            <Wrap>
                <Controller
                    name={name}
                    control={control}
                    defaultValue={field.default || ''}
                    render={({ field: f }) => (
                        <TextField
                            {...f}
                            label={field.title}
                            type="number"
                            fullWidth
                            sx={{ mt: 2 }}
                            helperText={field.description}
                            inputProps={{
                                min: field.minValue,
                                max: field.maxValue
                            }}
                            disabled={disabled}
                        />
                    )}
                />
            </Wrap>
        );
    }

    if (field.type === 'checkbox') {
        return (
            <Wrap>
                <FormControl sx={{ mt: 2 }} disabled={disabled}>
                    <FormLabel>{field.title}</FormLabel>
                    <Controller
                        name={name}
                        control={control}
                        defaultValue={false}
                        render={({ field: f }) => (
                            <Checkbox {...f} checked={!!f.value} />
                        )}
                    />
                    {field.description && <FormHelperText>{field.description}</FormHelperText>}
                </FormControl>
            </Wrap>
        );
    }

    return null;
}
