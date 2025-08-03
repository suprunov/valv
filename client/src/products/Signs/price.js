const price = {
    digitalPrinting: {
        color: {label: "Стоимость печати 1 листа SRA3 с одной стороны", value: 150,},
        material: {
            maxiSilk130: {label: "Стоимость 1 листа SRA3 бумаги мелованной MaxiSilk, 130г/м²", value: 10},
            maxiSilk170: {label: "Стоимость 1 листа SRA3 бумаги мелованной MaxiSilk, 170г/м²", value: 15},
            maxiSilk300: {label: "Стоимость 1 листа SRA3 бумаги мелованной MaxiSilk, 300г/м²", value: 45},
            office80: {label: "Стоимость 1 листа SRA3 бумаги офисной, 80г/м²", value: 2},
            dns300: {label: "Стоимость 1 листа SRA3 бумаги «DNS», 300г/м²", value: 100},
            len280: {label: "Стоимость 1 листа SRA3 бумаги тисненой «Лён», 280г/м²", value: 150},
            majestic: {label: "Стоимость 1 листа SRA3 бумаги Majestic", value: 240},
            touchCover: {label: "Стоимость 1 листа SRA3 бумаги TouchCover", value: 350},
            stickerPaperMatte: {label: "Стоимость 1 листа SRA3 бумаги самоклеящейся, матовой", value: 50},
            stickerPaperGlossy: {label: "Стоимость 1 листа SRA3 бумаги самоклеящейся, глянцевой", value: 50},
            polyLaserWhiteGlossy: {label: "Стоимость 1 листа SRA3 пленки самоклеящейся, белой глянцевой", value: 350},
            polyLaserWhiteMatte: {label: "Стоимость 1 листа SRA3 пленки самоклеящейся, белая матовой", value: 350},
            polyLaserTransparentGlossy: {
                label: "Стоимость 1 листа SRA3 пленки самоклеящейся, прозрачной глянцевой",
                value: 350
            },
            polyLaserTransparentMatte: {
                label: "Стоимость 1 листа SRA3 пленки самоклеящейся, прозрачной матовой",
                value: 350
            },
        },
        lamination: {
            laminationGloss32: {
                label: "Стоимость ламинирования 1 листа SRA3 с одной стороны глянцевой ламинацией 32мк",
                value: 10
            },
            laminationGloss75: {
                label: "Стоимость ламинирования 1 листа SRA3 с одной стороны глянцевой ламинацией 75мк",
                value: 20
            },
            laminationGloss125: {
                label: "Стоимость ламинирования 1 листа SRA3 с одной стороны глянцевой ламинацией 125мк",
                value: 30
            },
            laminationGloss200: {
                label: "Стоимость ламинирования 1 листа SRA3 с одной стороны глянцевой ламинацией 200мк",
                value: 40
            },
            laminationMatte32: {
                label: "Стоимость ламинирования 1 листа SRA3 с одной стороны матовой ламинацией 32мк",
                value: 10
            },
            laminationMatte75: {
                label: "Стоимость ламинирования 1 листа SRA3 с одной стороны матовой ламинацией 75мк",
                value: 20
            },
            laminationMatte125: {
                label: "Стоимость ламинирования 1 листа SRA3 с одной стороны матовой ламинацией 125мк",
                value: 30
            },
            laminationMatte200: {
                label: "Стоимость ламинирования 1 листа SRA3 с одной стороны матовой ламинацией 200мк",
                value: 40
            },
        },
        roundCorners: {label: "Стоимость скругления углов для базового тиража 100 экземпляров", value: 100,},
        holePunching: {label: "Стоимость сверления 1 отверстия для базового тиража 100 экземпляров", value: 50,},
        creasing: {label: "Стоимость 1 бига для базового тиража 100 экземпляров", value: 200,},
        folding: {label: "Стоимость 1 фальца для базового тиража 100 экземпляров", value: 200,},
        perforation: {label: "Стоимость 1 линии перфорации для базового тиража 100 экземпляров", value: 200,},
        binding: {
            plastic: {
                label: "Стоимость брошюровки на пластиковую пружину для базового тиража 100 экземпляров",
                value: 250
            },
            metal: {
                label: "Стоимость брошюровки на металлическую пружину для базового тиража 100 экземпляров",
                value: 250
            },
            stitching: {label: "Стоимость сшивания нитью для базового тиража 100 экземпляров", value: 150},
            staple: {label: "Стоимость брошюровки на скобу для базового тиража 100 экземпляров", value: 50},
            staple2: {label: "Стоимость брошюровки на 2 скобы для базового тиража 100 экземпляров", value: 100},
        },
        numbering: {label: "Стоимость нумерации (один номер) для базового тиража 100 экземпляров", value: 100,},
        collation: {label: "Стоимость подбора для базового тиража 100 экземпляров", value: 100,},
        cutting: {label: "Базовая стоимость 1 реза", value: 20,},
        discounts: {
            label: "Скидки за объем", value: [
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
            ]
        },
    }
}

export default price;