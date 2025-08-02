export function transformParams(params, refs) {
    return Object.entries(params).map(([key, def]) => {
        const param = { key, ...def };

        if (def.type === 'select' && Array.isArray(def.options)) {
            const options = def.options;
            const customOption = options.find(o => typeof o.value === 'function');

            param.type = 'custom-select';
            param.fields = Object.keys(options.find(o => typeof o.value !== 'function')?.value || {});
            param.fieldLabels = param.fields.reduce((acc, field) => {
                acc[field] = field;
                return acc;
            }, {});
            param.fieldValidation = param.fields.reduce((acc, field) => {
                acc[field] = { min: 1, max: 10000 };
                return acc;
            }, {});
            param.defaultValue = options.find(o => o.value?.default)?.title;

            param.groupedOptions = [
                {
                    group: def.title,
                    options: options.map(o => ({
                        label: o.title,
                        values: typeof o.value === 'function' ? o.value() : o.value,
                    }))
                }
            ];

            param.config = {
                label: param.title,
                fields: param.fields,
                fieldLabels: param.fieldLabels,
                fieldValidation: param.fieldValidation,
                layout: 'inline',
                defaultValue: param.defaultValue,
                groupedOptions: param.groupedOptions,
                onChange: (val, helpers) => {
                    if (helpers?.setCustomDefaults) {
                        refs.current[key] = val;
                    }
                },
                getPreviousDefaults: () => refs.current[key],
            };
        }

        return param;
    });
}
