import { Button, Typography, Box, Card, CardContent, Grid, Link, Avatar } from '@mui/material';

const RecentAnalysisCard = (props) => {
    return (
        <Grid key={props.index} item xs={12} sm={6} md={4} sx={{ p: 2 }}>
            <Card>
                <CardContent>
                    <Box
                        component="form"
                        onSubmit={props.handleURLSubmit}
                        sx={{
                            '& > :not(style)': { m: 1 }
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <input
                            readOnly
                            hidden
                            id="outlined-basic"
                            size="small"
                            value={props.index}
                            name="index"
                            label="Index"
                            variant="outlined"
                        />
                        <Link
                            sx={{
                                textDecoration: 'none',
                                cursor: 'pointer',
                                '&:hover': {
                                    textDecoration: 'underline',
                                    color: '#fff'
                                },
                                textAlign: 'left'
                            }}
                            component="button"
                            type="submit"
                        >
                            <Typography gutterBottom variant="h5" component="div">
                                {props.productTitle}
                            </Typography>
                        </Link>
                        <Avatar sx={{ background: 'black' }} src={props.AmazonLogo} alt="amazonLogo" />
                        <Typography variant="body2" color="text.secondary">
                            {props.productSite}{' '}
                        </Typography>
                        <Button size="small" type="submit" variant="contained" sx={{ mt: 2 }}>
                            Learn More
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};
export default RecentAnalysisCard;
