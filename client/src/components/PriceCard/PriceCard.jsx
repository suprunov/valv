import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Collapse,
    IconButton,
    Typography,
    Button,
    Box,
    Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const formatPrice = (value) =>
    typeof value === 'number' ? value.toLocaleString('ru-RU') : '—';

const PriceCard = ({ title, img, price = {}, content = {} }) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => setExpanded(!expanded);

    const {
        summary = 'Описание заказа формируется автоматически',
        totalBasePrice = {},
        totalPrice = {},
        totalDiscount = {},
    } = price;

    const hasDiscount = totalDiscount?.value > 0;

    return (
        <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.2rem', p: 2 }}>
                Стоимость
            </Typography>

            {img && (
                <CardMedia
                    component="img"
                    height="180"
                    image={img}
                    alt={title}
                    sx={{ objectFit: 'cover' }}
                />
            )}

            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    {summary}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                    {hasDiscount ? (
                        <>
                            <Typography
                                variant="body2"
                                sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                            >
                                {totalBasePrice.label || 'Базовая стоимость'}: {formatPrice(totalBasePrice.value)} ₽
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary', fontSize: '0.85rem' }}
                            >
                                {totalDiscount.label || 'Скидка'}: −{formatPrice(totalDiscount.value)} ₽
                            </Typography>
                            <Typography
                                variant="h5"
                                sx={{ color: 'error.main', fontWeight: 700 }}
                            >
                                {totalPrice.label || 'Стоимость заказа'}: {formatPrice(totalPrice.value)} ₽
                            </Typography>
                        </>
                    ) : (
                        <Typography
                            variant="h5"
                            sx={{ color: 'error.main', fontWeight: 700 }}
                        >
                            Стоимость заказа: {formatPrice(totalPrice.value)} ₽
                        </Typography>
                    )}
                </Box>
            </CardContent>

            <CardActions disableSpacing>
                <Button variant="contained" size="small" color="primary">
                    Заказать
                </Button>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Подробнее"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Все параметры заказа:
                    </Typography>
                    <pre style={{ fontSize: '0.8em', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                        {JSON.stringify(content, null, 2)}
                    </pre>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default PriceCard;
