const params = {
    size: {
        type: "select",
        title: "Размеры",
        description: "Размеры, ШxВ, мм",
        options: [
            {title: "90x50", value: {height: 90, width: 50, default: true}},
            {title: "85x55", value: {height: 85, width: 55}},
            {
                title: "Свой размер", value: () => {
                    return {
                        height: null,
                        width: null,
                    }
                }
            },
        ],
    },
    kinds: {
        type: "number",
        title: "Количество видов",
        description: "Количество видов",
        default: 1,
        minValue: 1,
        maxValue: 1000000,
    },
    count: {
        type: "select",
        title: "Тираж",
        description: "Тираж одного вида",
        options: [
            {title: "50 шт.", value: 50},
            {title: "100 шт.", value: 100, default: true},
            {title: "200 шт.", value: 200},
            {title: "500 шт.", value: 300},
            {title: "1000 шт.", value: 1000},
            {title: "2000 шт.", value: 2000},
            {
                title: "Свой тираж", value: () => {
                    return null
                }
            },
        ],
        discounts: [
            {from: 0, to: 50, value: 0},
            {from: 51, to: 100, value: 2},
            {from: 101, to: 200, value: 5},
            {from: 201, to: 300, value: 10},
            {from: 301, to: 400, value: 15},
            {from: 401, to: 500, value: 20},
            {from: 501, to: 600, value: 25},
            {from: 601, to: 700, value: 30},
            {from: 701, to: 800, value: 33},
            {from: 801, to: 900, value: 36},
            {from: 901, to: 1000, value: 40},
            {from: 1001, to: 1500, value: 45},
            {from: 1501, to: 2000, value: 48},
            {from: 2001, to: Number.POSITIVE_INFINITY, value: 50}
        ],
    },
    color: {
        type: "select",
        title: "Цветность",
        description: "Печать с одной или с двух сторон",
        options: {
            oneSide: {title: "Односторонние", default: true,},
            twoSide: {title: "Двусторонние", disable: ["material.options.stickerPaper"]},
        }
    },
    material: {
        type: "select",
        title: "Материал",
        description: "Материал печати",
        options: {
            office80: {title: "Бумага офисная, 80г/м²", default: true,},
            maxiSilk130: {title: "Бумага мелованная MaxiSilk, 130г/м²",},
            maxiSilk170: {title: "Бумага мелованная MaxiSilk, 170г/м²",},
            maxiSilk300: {title: "Бумага мелованная MaxiSilk, 300г/м²",},
            lenWhite280: {title: "Бумага тисненая «Лён (белый)», 280г/м²",},
            lenYellow280: {title: "Бумага тисненая «Лён (Слоновая кость)», 280г/м²",},
            majestic: {title: "Бумага Majestic",},
            touchCover: {title: "Бумага TouchCover",},
            stickerPaper: {title: "Бумага самоклеящаяся", disable: ["color.options.twoSide"]},
        }
    },
    lamination1: {
        type: "select",
        title: "Ламинирование 1 стороны",
        description: "Ламинирование 1 стороны",
        options: {
            lamination1no: {title: "нет", default: true,},
            lamination1gloss32: {title: "Глянцевая, 32мк",},
            lamination1gloss75: {title: "Глянцевая, 75мк",},
            lamination1gloss125: {title: "Глянцевая, 125мк",},
            lamination1gloss200: {title: "Глянцевая, 200мк",},
            lamination1matte32: {title: "Матовая, 32мк",},
            lamination1matte75: {title: "Матовая, 75мк",},
            lamination1matte125: {title: "Матовая, 125мк",},
            lamination1matte200: {title: "Матовая, 200мк",},
        }
    },
    lamination2: {
        type: "select",
        title: "Ламинирование 2 стороны",
        description: "Ламинирование 2 стороны",
        options: {
            lamination2no: {title: "нет", default: true,},
            lamination2gloss32: {title: "Глянцевая, 32мк", disable: ["material.options.stickerPaper"]},
            lamination2gloss75: {title: "Глянцевая, 75мк", disable: ["material.options.stickerPaper"]},
            lamination2gloss125: {title: "Глянцевая, 125мк", disable: ["material.options.stickerPaper"]},
            lamination2gloss200: {title: "Глянцевая, 200мк", disable: ["material.options.stickerPaper"]},
            lamination2matte32: {title: "Матовая, 32мк", disable: ["material.options.stickerPaper"]},
            lamination2matte75: {title: "Матовая, 75мк", disable: ["material.options.stickerPaper"]},
            lamination2matte125: {title: "Матовая, 125мк", disable: ["material.options.stickerPaper"]},
            lamination2matte200: {title: "Матовая, 200мк", disable: ["material.options.stickerPaper"]},
        }
    },
    roundCorners: {
        type: "checkbox",
        title: "Скругление углов",
        description: "Скругление углов",
    },
    holePunching: {
        type: "select",
        title: "Сверление отверстий",
        description: "Используется для подготовки документов к подшивке в папки или скоросшиватели. Применяются дыроколы или специализированные станки для точного сверления отверстий.",
        options: {
            holePunchingNo: {title: "нет", default: true,},
            holePunching1: {title: "1 отверстие",},
            holePunching2: {title: "2 отверстия",},
            holePunching3: {title: "3 отверстия",},
            holePunching4: {title: "4 отверстия",},
        }
    },
    creasing: {
        type: "select",
        title: "Биговка (продавливание линии сгиба)",
        description: "Создание углублённой линии сгиба на плотной бумаге или картоне для аккуратного и чистого складывания. Особенно важно для открыток, обложек и упаковки.",
        options: {
            creasingNo: {title: "нет", default: true,},
            creasing1: {title: "1 сгиб", disable: ["material.options.stickerPaper"]},
            creasing2: {title: "2 сгиба", disable: ["material.options.stickerPaper"]},
            creasing3: {title: "3 сгиба", disable: ["material.options.stickerPaper"]},
            creasing4: {title: "4 сгиба", disable: ["material.options.stickerPaper"]},
        }
    },
    folding: {
        type: "select",
        title: "Фальцовка (сгибание листов)",
        description: "Сгибание листов бумаги по определённой схеме (пополам, гармошкой, буклетом). Часто применяется для брошюр, буклетов, инструкций.",
        options: {
            foldingNo: {title: "нет", default: true,},
            folding1: {title: "1 сгиб", disable: ["material.options.stickerPaper"]},
            folding2: {title: "2 сгиба", disable: ["material.options.stickerPaper"]},
            folding3: {title: "3 сгиба", disable: ["material.options.stickerPaper"]},
            folding4: {title: "4 сгиба", disable: ["material.options.stickerPaper"]},
        }
    },
    perforation: {
        type: "select",
        title: "Перфорация (линии отрыва)",
        description: "Нанесение пунктирной линии, по которой можно легко оторвать часть бумаги. Применяется в билетах, купонах, квитанциях и блокнотах.",
        options: {
            perforationNo: {title: "нет", default: true,},
            perforation1: {title: "1 линия", disable: ["material.options.stickerPaper"]},
            perforation2: {title: "2 линии", disable: ["material.options.stickerPaper"]},
            perforation3: {title: "3 линии", disable: ["material.options.stickerPaper"]},
        }
    },
    binding: {
        type: "select",
        title: "Брошюровка (переплёт)",
        description: "Сборка и скрепление набора листов в единый блок. Бывает на пластиковую или металлическую пружину, клеевой или твёрдый переплёт. Используется для отчётов, дипломов, каталогов.",
        options: {
            bindingNo: {title: "нет", default: true,},
            plasticBinding: {title: "На пластиковую пружину", disable: ["material.options.stickerPaper"]},
            wireBinding: {title: "На металлическую пружину", disable: ["material.options.stickerPaper"]},
            stapleBinding1: {title: "На скобу", disable: ["material.options.stickerPaper"]},
            stapleBinding2: {title: "На 2 скобы", disable: ["material.options.stickerPaper"]},
        }
    },
    numbering: {
        type: "checkbox",
        title: "Нумерация документов",
        description: "Автоматическое нанесение последовательных номеров на листы или документы. Применяется для квитанций, бланков строгой отчётности, билетов и т.п.",
    },
    collation: {
        type: "checkbox",
        title: "Листоподбор (сортировка по порядку)",
        description: "Раскладывание отпечатанных листов по порядку в наборы. Может быть автоматическим или ручным. Важно для многостраничных документов перед брошюровкой.",
    }
}

export default params;
