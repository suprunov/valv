import React, { useEffect, useRef } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Box, Container, Paper, Typography, Grid } from "@mui/material";
import Selector from "../../components/Selector";
import { params, generateSummary } from "./params";
import PriceCard from "../../components/PriceCard";
import img from "./digitalprint.png";

export default function DigitalPrinting() {
    const methods = useForm();
    const formValues = useWatch({ control: methods.control });
    const previousPrice = useRef({});
    const previousLog = useRef('');

    Object.entries(params.fields).forEach(([name, field]) => {
        if (field.type === "selector" || field.type === "editable-select") {
            field.onChange = (val, helpers) => {
                const hasValues = field.fields?.every((f) => val?.[f] != null);
                if (helpers?.setCustomDefaults && hasValues) {
                    previousPrice.current[name] = val;
                }
            };
            field.getPreviousDefaults = () => previousPrice.current[name] ?? {};
        }
    });

    const formatFormData = (rawData) => {
        const result = {};

        Object.entries(params.fields).forEach(([name, field]) => {
            result[`${name}_label`] = rawData[name] ?? '';

            const values = {};
            for (const f of field.fields || []) {
                const value = rawData[`${name}_${f}`];
                if (typeof value === 'number') {
                    values[f] = value;
                } else if (!isNaN(value)) {
                    values[f] = Number(value);
                }
            }

            result[name] = Object.keys(values).length === 1
                ? Object.values(values)[0]
                : values;
        });

        result.summary = generateSummary(result, Object.fromEntries(
            Object.entries(params.fields).map(([k, v]) => [k, v.label])
        ));

        return result;
    };

    const isFormReady = (data) => {
        return Object.entries(params.fields).every(([name, field]) => {
            const label = data[`${name}_label`];
            const value = data[name];
            return label && value !== undefined && value !== '';
        });
    };

    useEffect(() => {
        const formatted = formatFormData(methods.getValues());
        const logString = JSON.stringify(formatted);

        if (isFormReady(formatted) && logString !== previousLog.current) {
            previousLog.current = logString;
            console.log("Данные формы:", formatted);
        }
    }, [formValues, methods]);

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" gutterBottom>
                Цифровая печать
            </Typography>

            <FormProvider {...methods}>
                <form>
                    <Box
                        display="grid"
                        gridTemplateColumns="repeat(3, 1fr)"
                        gap={3}
                        mt={2}
                    >
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.2rem', mb: 2 }}>
                                Печать
                            </Typography>
                            <Box sx={{ mb: 3 }}><Selector name="size" editable config={params.fields.size} /></Box>
                            <Box sx={{ mb: 3 }}><Selector name="kinds" editable config={params.fields.kinds} /></Box>
                            <Box sx={{ mb: 3 }}><Selector name="quantity" editable config={params.fields.quantity} /></Box>
                            <Box sx={{ mb: 3 }}><Selector name="color" config={params.fields.color} /></Box>
                            <Box sx={{ mb: 3 }}><Selector name="material" config={params.fields.material} /></Box>
                        </Paper>

                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.2rem', mb: 2 }}>
                                Постпечатная обработка
                            </Typography>

                            <Box sx={{ mb: 3 }}><Selector name="lamination1" config={params.fields.lamination1} /></Box>
                            <Box sx={{ mb: 3 }}><Selector name="lamination2" config={params.fields.lamination2} /></Box>
                            <Box sx={{ mb: 3 }}><Selector name="roundCorners" config={params.fields.roundCorners} /></Box>
                            <Box sx={{ mb: 3 }}><Selector name="holePunching" config={params.fields.holePunching} /></Box>
                            <Box sx={{ mb: 3 }}><Selector name="creasing" config={params.fields.creasing} /></Box>
                            <Box sx={{ mb: 3 }}><Selector name="folding" config={params.fields.folding} /></Box>
                            <Box sx={{ mb: 3 }}><Selector name="perforation" config={params.fields.perforation} /></Box>
                            <Box sx={{ mb: 3 }}><Selector name="binding" config={params.fields.binding} /></Box>
                            <Box sx={{ mb: 3 }}><Selector name="numbering" config={params.fields.numbering} /></Box>
                            <Box sx={{ mb: 3 }}><Selector name="collation" config={params.fields.collation} /></Box>
                        </Paper>

                        <PriceCard
                            title="Цифровая печать"
                            img={img}
                            content={formatFormData(methods.getValues())}
                        />
                    </Box>
                </form>
            </FormProvider>
        </Container>
    );
}
