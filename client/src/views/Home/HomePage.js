// @mui
import { Container, Stack, Typography, Grid } from '@mui/material';
import HomePageCard from './HomePageCard';

export default function HomePage() {
    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography variant="h1" gutterBottom>
                        Home
                    </Typography>
                </Stack>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} sm={6}>
                        <HomePageCard
                            imgSrc="https://img.freepik.com/free-vector/analysis-concept-illustration_114360-1119.jpg?w=740&t=st=1687791132~exp=1687791732~hmac=a2cd0498aada7dac30820aa6890ca5faf6319cd54e7fd940a5df16c87dd33392"
                            title="Analyse Review"
                            desc="Analyse reviews of amazon products and check the sentiments score of the product about what users says."
                            btnContent="Analyse Review"
                            link="analyseReview"
                        />
                    </Grid>
                    <Grid item xs={12} md={4} sm={6}>
                        <HomePageCard
                            imgSrc="https://img.freepik.com/free-vector/choosing-healthy-unhealthy-food_23-2148562454.jpg?w=1060&t=st=1687791429~exp=1687792029~hmac=a5cbcd61bc4a208fb47c53c3b08073501ca59f3841e79599fa0e67b3d364b47e"
                            title="Compare Products"
                            desc="Compare two Amazon Products on the basis of the sentiments of the reviews given by the users of the product."
                            btnContent="Compare Products"
                            link="compareProducts"
                        />
                    </Grid>
                    <Grid item xs={12} md={4} sm={6}>
                        <HomePageCard
                            imgSrc="https://img.freepik.com/free-vector/choice-concept-illustration_114360-5842.jpg?w=740&t=st=1687791462~exp=1687792062~hmac=8ccc99d4fe47062fa5f4df34769ecc8768130144cab395a12a1b0d470b21786c"
                            title="Compare Amazon & Flipkart"
                            desc="Compare Amazon Product with Flipkart Product and check from where to buy the product on the basis of analysis."
                            btnContent="Compare Sites"
                            link="amazonFlipkartComparison"
                        />
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}
