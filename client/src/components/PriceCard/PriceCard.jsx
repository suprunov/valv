import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
    Card,
    CardHeader,
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

const PriceCard = ({ title, img, price, content = {} }) => {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    console.log(price)
    const {
        summary = '',
        sheetsPerKind,
        piecesPerSheet,
        discount,
    } = content;

    return (
        <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1.2rem', p: 2 }}>
                Стоимость
            </Typography>
            <CardMedia
                component="img"
                height="180"
                image={img}
                alt={title}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    {summary || 'Описание заказа формируется автоматически'}
                </Typography>

                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">
                        <b>Листов SRA3 на 1 вид:</b> {sheetsPerKind ?? '—'}
                    </Typography>
                    <Typography variant="body2">
                        <b>Экземпляров на листе:</b> {piecesPerSheet ?? '—'}
                    </Typography>
                    <Typography variant="body2">
                        <b>Скидка:</b> {discount ?? 0}%
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h5" color="primary">
                    Цена: {100} ₽
                </Typography>
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
