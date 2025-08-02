import price from './price';
const fields = {
        size: {
            type: "selector",
            label: 'Формат',
            fields: ['width', 'height'],
            fieldLabels: {width: 'Ширина, мм', height: 'Высота, мм'},
            fieldValidation: {
                width: {min: 35, max: 300},
                height: {min: 35, max: 420},
            },
            layout: 'inline',
            defaultValue: 'Визитка 90x50',
            groupedOptions: [
                {
                    options: [
                        {label: 'Визитка 90x50', values: {width: 50, height: 90}},
                        {label: 'Визитка 85x55', values: {width: 55, height: 85}},
                        {label: 'A3', values: {width: 297, height: 420}},
                        {label: 'A4', values: {width: 210, height: 297}},
                        {label: 'A5', values: {width: 148, height: 210}},
                        {label: 'A6', values: {width: 105, height: 148}},
                        {label: 'A7', values: {width: 74, height: 105}},
                    ],
                },
            ],
        },
        quantity: {
            type: "selector",
            label: 'Тираж',
            fields: ['quantity'],
            fieldLabels: {quantity: 'Тираж, шт'},
            fieldValidation: {quantity: {min: 1, max: Number.POSITIVE_INFINITY}},
            layout: 'inline',
            defaultValue: '50',
            groupedOptions: [
                {
                    options: [
                        {label: '50', values: {quantity: 50}},
                        {label: '100', values: {quantity: 100}},
                        {label: '200', values: {quantity: 200}},
                        {label: '300', values: {quantity: 300}},
                        {label: '300', values: {quantity: 400}},
                        {label: '500', values: {quantity: 500}},
                        {label: '1000', values: {quantity: 1000}},
                        {label: '2000', values: {quantity: 2000}},
                    ],
                },
            ],
        },
        kinds: {
            type: "selector",
            label: 'Количество видов',
            fields: ['kinds'],
            fieldLabels: {kinds: 'видов'},
            fieldValidation: {kinds: {min: 1, max: Number.POSITIVE_INFINITY}},
            layout: 'inline',
            defaultValue: '1',
            groupedOptions: [
                {
                    options: [
                        {label: '1', values: {kinds: 1}},
                        {label: '2', values: {kinds: 2}},
                        {label: '3', values: {kinds: 3}},
                        {label: '4', values: {kinds: 4}},
                    ],
                },
            ],
        },
        color: {
            type: "selector",
            label: 'Печать',
            fields: ['color'],
            fieldLabels: {color: 'Печать'},
            layout: 'inline',
            defaultValue: 'С одной стороны',
            description: "Печать с одной или с двух сторон",
            disabledIf: [
                {field: 'material', equals: "stickerPaperMatte"},
                {field: 'material', equals: "stickerPaperGlossy"},
                {field: 'material', equals: "polyLaserWhiteGlossy"},
                {field: 'material', equals: "polyLaserWhiteMatte"},
                {field: 'material', equals: "polyLaserTransparentGlossy"},
                {field: 'material', equals: "polyLaserTransparentMatte"},
            ],
            invisibleIf: [{field: 'material', equals: 0}],
            groupedOptions: [
                {
                    options: [
                        {label: 'С одной стороны', values: {color: price.digitalPrinting.color.value}},
                        {label: 'С двух сторон', values: {color: price.digitalPrinting.color.value * 2}},
                        {label: 'Без печати', values: {color: 0}},
                    ],
                },
            ],
        },
        material: {
            type: "selector",
            label: 'Материал',
            fields: ['material'],
            fieldLabels: {material: 'Материал'},
            layout: 'inline',
            defaultValue: "Бумага мелованная MaxiSilk, 300г/м²",
            description: "Материал для печати",
            groupedOptions: [
                {
                    group: 'Мелованые бумаги',
                    options: [
                        {label: "Бумага мелованная MaxiSilk, 130г/м²", values: {material:   price.digitalPrinting.material.maxiSilk130.value}},
                        {label: "Бумага мелованная MaxiSilk, 170г/м²", values: {material:   price.digitalPrinting.material.maxiSilk170.value}},
                        {label: "Бумага мелованная MaxiSilk, 300г/м²", values: {material:   price.digitalPrinting.material.maxiSilk300.value}},
                        {label: "Бумага офисная, 80г/м²", values: {material:                price.digitalPrinting.material.office80.value}},
                    ],
                },
                {
                    group: 'Дизайнерские бумаги',
                    options: [
                        {label: "Бумага «DNS», 300г/м²", values: {material:                 price.digitalPrinting.material.dns300.value}},
                        {label: "Бумага тисненая «Лён», 280г/м²", values: {material:        price.digitalPrinting.material.len280.value}},
                        {label: "Бумага Majestic", values: {material:                       price.digitalPrinting.material.majestic.value}},
                        {label: "Бумага TouchCover", values: {material:                     price.digitalPrinting.material.touchCover.value}},
                    ],
                },
                {
                    group: 'Самоклейки',
                    options: [
                        {label: "Бумага самоклеящаяся, матовая", values: {material:                 price.digitalPrinting.material.stickerPaperMatte.value}},
                        {label: "Бумага самоклеящаяся, глянцевая", values: {material:               price.digitalPrinting.material.stickerPaperGlossy.value}},
                        {label: "Пленка самоклеящаяся, белая глянцевая", values: {material:         price.digitalPrinting.material.polyLaserWhiteGlossy.value}},
                        {label: "Пленка самоклеящаяся, белая матовая", values: {material:           price.digitalPrinting.material.polyLaserWhiteMatte.value}},
                        {label: "Пленка самоклеящаяся, прозрачная глянцевая",values: {material:     price.digitalPrinting.material.polyLaserTransparentGlossy.value}},
                        {label: "Пленка самоклеящаяся, прозрачная матовая",values: {material:       price.digitalPrinting.material.polyLaserTransparentMatte.value}},
                    ],
                },
            ],
        },
        lamination1: {
            type: "selector",
            label: "Ламинирование 1 стороны",
            description: "Ламинирование 1 стороны",
            fields: ['lamination1'],
            fieldLabels: {lamination1: 'Ламинирование 1 стороны'},
            layout: 'inline',
            defaultValue: 'нет',
            groupedOptions: [
                {
                    options: [
                        {label: "нет", values: {lamination1: 0}},
                        {label: "ламинация глянцевая, 32мк", values: {  lamination1: price.digitalPrinting.lamination.laminationGloss32.value}},
                        {label: "ламинация глянцевая, 75мк", values: {  lamination1: price.digitalPrinting.lamination.laminationGloss75.value}},
                        {label: "ламинация глянцевая, 125мк", values: { lamination1: price.digitalPrinting.lamination.laminationGloss125.value}},
                        {label: "ламинация глянцевая, 200мк", values: { lamination1: price.digitalPrinting.lamination.laminationGloss200.value}},
                        {label: "ламинация матовая, 32мк", values: {    lamination1: price.digitalPrinting.lamination.laminationMatte32.value}},
                        {label: "ламинация матовая, 75мк", values: {    lamination1: price.digitalPrinting.lamination.laminationMatte75.value}},
                        {label: "ламинация матовая, 125мк", values: {   lamination1: price.digitalPrinting.lamination.laminationMatte125.value}},
                        {label: "ламинация матовая, 200мк", values: {   lamination1: price.digitalPrinting.lamination.laminationMatte200.value}},
                    ],
                },
            ],
        },
        lamination2: {
            type: "selector",
            label: "Ламинирование 2 стороны",
            description: "Ламинирование 2 стороны",
            fields: ['lamination2'],
            fieldLabels: {lamination2: 'Ламинирование 2 стороны'},
            layout: 'inline',
            defaultValue: 'нет',
            groupedOptions: [
                {
                    options: [
                        {label: "нет", values: {lamination2: 0}},
                        {label: "ламинация глянцевая, 32мк", values: {lamination2:  price.digitalPrinting.lamination.laminationGloss32.value}},
                        {label: "ламинация глянцевая, 75мк", values: {lamination2:  price.digitalPrinting.lamination.laminationGloss75.value}},
                        {label: "ламинация глянцевая, 125мк", values: {lamination2: price.digitalPrinting.lamination.laminationGloss125.value}},
                        {label: "ламинация глянцевая, 200мк", values: {lamination2: price.digitalPrinting.lamination.laminationGloss200.value}},
                        {label: "ламинация матовая, 32мк", values: {lamination2:    price.digitalPrinting.lamination.laminationMatte32.value}},
                        {label: "ламинация матовая, 75мк", values: {lamination2:    price.digitalPrinting.lamination.laminationMatte75.value}},
                        {label: "ламинация матовая, 125мк", values: {lamination2:   price.digitalPrinting.lamination.laminationMatte125.value}},
                        {label: "ламинация матовая, 200мк", values: {lamination2:   price.digitalPrinting.lamination.laminationMatte200.value}},
                    ],
                },
            ],
        },
        roundCorners: {
            type: "selector",
            label: "скругление углов",
            description: "скругление углов",
            fields: ['roundCorners'],
            fieldLabels: {roundCorners: 'скругление углов'},
            layout: 'inline',
            defaultValue: 'нет',
            groupedOptions: [
                {
                    options: [
                        {label: 'нет', values: {roundCorners: 0}},
                        {label: 'да', values: {roundCorners: price.digitalPrinting.roundCorners.value}},
                    ],
                },
            ],
        },
        holePunching: {
            type: "selector",
            label: "Сверление отверстий",
            description: "Сверление отверстий",
            fields: ['holePunching'],
            fieldLabels: {holePunching: 'Сверление'},
            layout: 'inline',
            defaultValue: 'нет',
            groupedOptions: [
                {
                    options: [
                        {label: 'нет', values: {holePunching: 0}},
                        {label: "1", values: {holePunching: price.digitalPrinting.holePunching.value}},
                        {label: "2", values: {holePunching: price.digitalPrinting.holePunching.value * 2}},
                        {label: "3", values: {holePunching: price.digitalPrinting.holePunching.value * 3}},
                        {label: "4", values: {holePunching: price.digitalPrinting.holePunching.value * 4}},
                    ],
                },
            ],
        },
        creasing: {
            type: "selector",
            label: "биговка",
            description: "Создание углублённой линии сгиба на плотной бумаге или картоне для аккуратного и чистого складывания. Особенно важно для открыток, обложек и упаковки.",
            fields: ['creasing'],
            fieldLabels: {holePunching: 'биговка'},
            layout: 'inline',
            defaultValue: 'нет',
            groupedOptions: [
                {
                    options: [
                        {label: 'нет', values: {creasing: 0}},
                        {label: "1", values: {creasing: price.digitalPrinting.creasing.value}},
                        {label: "2", values: {creasing: price.digitalPrinting.creasing.value * 2}},
                        {label: "3", values: {creasing: price.digitalPrinting.creasing.value *3}},
                        {label: "4", values: {creasing: price.digitalPrinting.creasing.value *4}},
                    ],
                },
            ],
        },
        folding: {
            type: "selector",
            label: "фальцовка",
            description: "Сгибание листов бумаги по определённой схеме (пополам, гармошкой, буклетом). Часто применяется для брошюр, буклетов, инструкций.",
            fields: ['folding'],
            fieldLabels: {folding: 'фальцовка'},
            layout: 'inline',
            defaultValue: 'нет',
            groupedOptions: [
                {
                    options: [
                        {label: 'нет', values: {folding: 0}},
                        {label: "1", values: {folding: price.digitalPrinting.folding.value}},
                        {label: "2", values: {folding: price.digitalPrinting.folding.value * 2}},
                        {label: "3", values: {folding: price.digitalPrinting.folding.value * 3}},
                        {label: "4", values: {folding: price.digitalPrinting.folding.value * 4}},
                    ],
                },
            ],
        },
        perforation: {
            type: "selector",
            label: "перфорация",
            description: "Нанесение пунктирной линии, по которой можно легко оторвать часть бумаги. Применяется в билетах, купонах, квитанциях и блокнотах.",
            fields: ['perforation'],
            fieldLabels: {perforation: 'перфорация'},
            layout: 'inline',
            defaultValue: 'нет',
            groupedOptions: [
                {
                    options: [
                        {label: 'нет', values: {perforation: 0}},
                        {label: "1", values: {perforation: price.digitalPrinting.perforation.value}},
                        {label: "2", values: {perforation: price.digitalPrinting.perforation.value * 2}},
                        {label: "3", values: {perforation: price.digitalPrinting.perforation.value * 3}},
                        {label: "4", values: {perforation: price.digitalPrinting.perforation.value * 4}},
                    ],
                },
            ],
        },
        binding: {
            type: "selector",
            label: "брошюровка/переплёт",
            description: "Сборка и скрепление набора листов в единый блок. Бывает на пластиковую или металлическую пружину, клеевой или твёрдый переплёт. Используется для отчётов, дипломов, каталогов.",
            fields: ['binding'],
            fieldLabels: {binding: 'брошюровка/переплёт'},
            layout: 'inline',
            defaultValue: 'нет',
            groupedOptions: [
                {
                    options: [
                        {label: 'нет', values: {binding: 0}},
                        {label: "брошюровка на пластиковую пружину", values:    {binding: price.digitalPrinting.binding.plastic.value}},
                        {label: "брошюровка на металлическую пружину", values:  {binding: price.digitalPrinting.binding.metal.value}},
                        {label: "сшивание нитью", values:                       {binding: price.digitalPrinting.binding.stitching.value}},
                        {label: "брошюровка на скобу", values:                  {binding: price.digitalPrinting.binding.staple.value}},
                        {label: "брошюровка на 2 скобы", values:                {binding: price.digitalPrinting.binding.staple2.value}},
                    ],
                },
            ],
        },
        numbering: {
            type: "selector",
            label: "нумерация",
            description: "Нанесение последовательных номеров на листы или документы. Применяется для квитанций, бланков строгой отчётности, билетов и т.п.",
            fields: ['numbering'],
            fieldLabels: {numbering: 'нумерация'},
            layout: 'inline',
            defaultValue: 'нет',
            groupedOptions: [
                {
                    options: [
                        {label: 'нет', values: {numbering: 0}},
                        {label: "в одном месте", values: {numbering: price.digitalPrinting.numbering.value}},
                        {label: "в двух и более местах", values: {numbering: price.digitalPrinting.numbering.value * 1.5}},
                    ],
                },
            ],
        },
        collation: {
            type: "selector",
            label: "листоподбор",
            description: "Раскладывание отпечатанных листов по порядку в наборы. Может быть автоматическим или ручным. Важно для многостраничных документов перед брошюровкой",
            fields: ['collation'],
            fieldLabels: {collation: 'листоподбор'},
            layout: 'inline',
            defaultValue: 'нет',
            groupedOptions: [
                {
                    options: [
                        {label: 'нет', values: {collation: 0}},
                        {label: "да", values: {collation: price.digitalPrinting.collation.value}},
                    ],
                },
            ],
        },
    };



// Поддержка условий с операторами сравнения
const conditionOperators = {
    equals: (a, b) => a === b,
    notEquals: (a, b) => a !== b,
    in: (a, b) => Array.isArray(b) && b.includes(a),
    notIn: (a, b) => Array.isArray(b) && !b.includes(a),
    gt: (a, b) => a > b,
    lt: (a, b) => a < b,
    gte: (a, b) => a >= b,
    lte: (a, b) => a <= b,
};

function checkConditions(conditions = [], values = {}) {
    return conditions.some(condition => {
        const {field, ...rest} = condition;
        const fieldValue = values[field];
        const operator = Object.keys(rest)[0];
        const compareTo = rest[operator];

        if (!conditionOperators[operator]) return false;
        return conditionOperators[operator](fieldValue, compareTo);
    });
}

// Пример шаблона описания заказа
function generateSummary(data, labels = {}) {
    const parts = [];

    const push = (key, prefix = '') => {
        const label = labels[key];
        const value = data[`${key}_label`] ?? '';
        if (value && value !== 'нет') parts.push(`${prefix}${label || key}: ${value}`);
    };

    push('size');
    push('quantity');
    push('kinds');
    push('material');
    push('color');
    push('lamination1', 'Ламинация спереди: ');
    push('lamination2', 'Ламинация сзади: ');
    push('roundCorners');
    push('holePunching', 'Отверстий: ');
    push('creasing', 'Биговка: ');
    push('folding', 'Фальцовка: ');
    push('perforation', 'Перфорация: ');
    push('binding');
    push('numbering');
    push('collation');

    return `Цифровая печать — ${parts.join(', ')}`;
}

const calculate = (data) => {
    //
    // const getCountOnSra3(data.size) => {
    //
    // }

    return {
        data: data,
        price: 50,
        discount: 10,
        sheetsPerKind: 5,
        piecesPerSheet: 10,
    };
};

export {
    fields, checkConditions, generateSummary, calculate
};

