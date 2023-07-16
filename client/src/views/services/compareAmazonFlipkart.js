// material-ui
import { Button, TextField, Typography, Avatar, Box, Stack, Card, CardContent, Grid, Paper, CircularProgress } from '@mui/material';
// project imports
import { useState } from 'react';
import Sentiment from 'sentiment';
import axios from 'axios';
import { useEffect } from 'react';
import RecentIntroCompCard from 'ui-component/cards/RecentIntraCompCard';
import AmazonLogo from '../../assets/images/logos/amazon_logo.png';
import FlipkartLogo from '../../assets/images/logos/flipkart_logo.png';
import { Link } from 'react-router-dom';
import { DATABASE_URL } from './helper';
const sentiment = new Sentiment();

// ==============================|| ANALYSE REVIEW PAGE ||============================== //

const CompareAmazonFlipkart = () => {
    const [intraSiteProductsComparison, setIntraSiteProductsComparison] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSelected, setIsSelected] = useState(-1);

    //Amazon Product - Function to analyse the review sentiment and give score
    const analyseAmazonProductText = (text) => {
        let sentimentObj = sentiment.analyze(text);
        let score = sentimentObj.score;
        amazonProductOverallSentiment(score);
        let sentimentType = '';
        let bgColor = '';
        let textColor = '';

        if (score > 0) {
            sentimentType = '👍🏻😍';
            bgColor = '#26a69a';
            textColor = '#fff';
        } else if (score < 0) {
            sentimentType = '👎🏻☹️';
            bgColor = '#F84D95';
            textColor = '#fff';
        } else {
            sentimentType = '🆗😐';
            bgColor = '#EDE7F6';
            textColor = '#000';
        }
        return (
            <>
                <Typography
                    variant="h3"
                    sx={{ background: bgColor, p: 1, borderRadius: 1.5, display: 'inline-block', color: textColor, my: 2 }}
                >
                    {sentimentType}
                    Sentiment Score: &nbsp;
                    {score}
                </Typography>
                <Typography variant="body1">{text}</Typography>
            </>
        );
    };

    //Flipkart Product - Function to analyse the review sentiment and give score
    const analyseFlipkartProductText = (text) => {
        let sentimentObj = sentiment.analyze(text);
        let score = sentimentObj.score;
        flipkartProductOverallSentiment(score);
        let sentimentType = '';
        let bgColor = '';
        let textColor = '';

        if (score > 0) {
            sentimentType = '👍🏻😍';
            bgColor = '#26a69a';
            textColor = '#fff';
        } else if (score < 0) {
            sentimentType = '👎🏻☹️';
            bgColor = '#F84D95';
            textColor = '#fff';
        } else {
            sentimentType = '🆗😐';
            bgColor = '#EDE7F6';
            textColor = '#000';
        }
        return (
            <>
                <Typography
                    variant="h3"
                    sx={{ background: bgColor, p: 1, borderRadius: 1.5, display: 'inline-block', color: textColor, my: 2 }}
                >
                    {sentimentType}
                    Sentiment Score: &nbsp;
                    {score}
                </Typography>
                <Typography variant="body1">{text}</Typography>
            </>
        );
    };

    //Function to show the latest Comparsion made
    const showLatestComparison = () => {
        setIsError(false);
        setIsLoading(false);
        setIsFormFilled(true);
    };

    //Function to switch the latest Comparison
    const switchLatestComparison = () => {
        setIsLoading(false);
        setIsFormFilled(false);
    };

    //Function to show the selected Comparison
    const showSelectedComparison = (i) => {
        setIsError(false);
        setIsLoading(false);
        setIsSelected(i);
    };

    //Function to switch the selected Comparison
    const switchSelectedComparison = () => {
        setIsLoading(false);
        setIsSelected(-1);
    };

    //Function to fetch products comparison data from the backend
    const fetchProductsData = async () => {
        const intraSiteProductsComparedData = await axios
            .get(`${DATABASE_URL}/intra/intraSiteProductsComparisonData`)
            .then(({ data }) => data);
        // console.log(intraSiteProductsComparedData);
        if (intraSiteProductsComparison.length === intraSiteProductsComparedData.length) {
            setIsError(true);
            setIsLoading(false);
        } else {
            if (intraSiteProductsComparison.length !== 0) setTimeout(showLatestComparison, 500);
            setIntraSiteProductsComparison(intraSiteProductsComparedData);
        }
    };

    //Function to post the form to the backend
    const postProductsURL = async (productsURLData) => {
        // console.log(productsURLData);
        const stringifiedProductsURLData = JSON.stringify(productsURLData);
        setTimeout(fetchProductsData, 7500);
        // setTimeout(showLatestComparison, 7000);
        try {
            await axios.post(`${DATABASE_URL}/intra/intraSiteProductsComparison`, stringifiedProductsURLData, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            console.log(err.respose);
        }
    };

    //UseEffect Function
    useEffect(() => {
        fetchProductsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Function to set the latest comparison of particular index
    var setLatestComparison = (i) => {
        var latestComparison = intraSiteProductsComparison[i];
        return latestComparison;
    };

    const handleURLSubmit = (e) => {
        e.preventDefault();
        switchSelectedComparison();
        switchLatestComparison();
        window.scrollTo(0, 0);
        setIsLoading(true);

        let amazonProductURL = e.target.amazonProductURL.value;
        let flipkartProductURL = e.target.flipkartProductURL.value;
        postProductsURL({
            amazonProductURL: amazonProductURL,
            flipkartProductURL: flipkartProductURL
        });

        if (
            amazonProductURL.substring(0, 22) != 'https://www.amazon.in/' ||
            flipkartProductURL.substring(0, 25) != 'https://www.flipkart.com/'
        ) {
            setIsError(true);
            setIsLoading(false);
        } else {
            setIsError(false);
            postProductsURL({
                amazonProductURL: amazonProductURL,
                flipkartProductURL: flipkartProductURL
            });
        }
        e.target.amazonProductURL.value = '';
        e.target.flipkartProductURL.value = '';
    };

    //Function to handle Select Submit - For Recent Options
    const handleURLSubmit2 = (e) => {
        e.preventDefault();
        switchLatestComparison();
        window.scrollTo(0, 0);
        showSelectedComparison(e.target.index.value);
    };

    let amazonProductOverallScore = 0;
    let flipkartProductOverallScore = 0;
    let amazonProductOverallSentimentScore = 0;
    let flipkartProductOverallSentimentScore = 0;
    let amazonProductOverallPositiveReviews = 0;
    let flipkartProductOverallPositiveReviews = 0;
    let amazonProductOverallNegativeReviews = 0;
    let flipkartProductOverallNegativeReviews = 0;
    let amazonProductOverallNeutralReviews = 0;
    let flipkartProductOverallNeutralReviews = 0;

    //Amazon Product - Function to return Amazon Product Sentiment Score
    const amazonProductOverallSentiment = (reviewScore) => {
        if (reviewScore > 0) {
            ++amazonProductOverallPositiveReviews;
        } else if (reviewScore < 0) {
            ++amazonProductOverallNegativeReviews;
        } else {
            ++amazonProductOverallNeutralReviews;
        }
        amazonProductOverallSentimentScore += reviewScore;
        return amazonProductOverallSentimentScore;
    };

    //Flipkart Product - Function to return Flipkart Product Sentiment Score
    const flipkartProductOverallSentiment = (reviewScore) => {
        if (reviewScore > 0) {
            ++flipkartProductOverallPositiveReviews;
        } else if (reviewScore < 0) {
            ++flipkartProductOverallNegativeReviews;
        } else {
            ++flipkartProductOverallNeutralReviews;
        }
        flipkartProductOverallSentimentScore += reviewScore;
        return flipkartProductOverallSentimentScore;
    };

    //Overall - Function to return overall Sentiment Score
    const overallComparison = (amazonProductPrice, flipkartProductPrice, amazonProductDiscount, flipkartProductDiscount) => {
        if (amazonProductOverallSentimentScore > flipkartProductOverallSentimentScore) {
            ++amazonProductOverallScore;
        } else if (amazonProductOverallSentimentScore < flipkartProductOverallSentimentScore) {
            ++flipkartProductOverallScore;
        }
        if (amazonProductOverallPositiveReviews > flipkartProductOverallPositiveReviews) {
            ++amazonProductOverallScore;
        } else if (amazonProductOverallPositiveReviews < flipkartProductOverallPositiveReviews) {
            ++flipkartProductOverallScore;
        }
        if (amazonProductOverallNegativeReviews > flipkartProductOverallNegativeReviews) {
            ++flipkartProductOverallScore;
        } else if (amazonProductOverallNegativeReviews < flipkartProductOverallNegativeReviews) {
            ++amazonProductOverallScore;
        }
        if (amazonProductPrice < flipkartProductPrice) {
            ++amazonProductOverallScore;
        } else if (amazonProductPrice > flipkartProductPrice) {
            ++flipkartProductOverallScore;
        }
        if (amazonProductDiscount < flipkartProductDiscount) {
            ++flipkartProductOverallScore;
        } else if (amazonProductDiscount > flipkartProductDiscount) {
            ++amazonProductOverallScore;
        }
    };

    //Amazon Product - Function to render the results of the analysis
    const amazonProductAnalysisResult = (amazonProductPrice, flipkartProductPrice, amazonProductDiscount, flipkartProductDiscount) => {
        overallComparison(amazonProductPrice, flipkartProductPrice, amazonProductDiscount, flipkartProductDiscount);
        let sentimentType = '';
        let textColor = '';
        let overallSentimentColor = '';
        let comparisonColor = '';

        if (amazonProductOverallScore > flipkartProductOverallScore) {
            textColor = '#fff';
            overallSentimentColor = '#ffeb3b';
            sentimentType = '👍🏻😍';
            comparisonColor = '#26a69a';
        } else if (amazonProductOverallScore < flipkartProductOverallScore) {
            textColor = '#fff';
            overallSentimentColor = '#ffeb3b';
            comparisonColor = '#F84D95';
            sentimentType = '👎🏻☹️';
        } else {
            textColor = '#000';
            overallSentimentColor = '#5E35B1';
            comparisonColor = '#EDE7F6';
            sentimentType = '🆗😐';
        }

        // console.log(amazonProductOverallScore, flipkartProductOverallScore);
        return (
            <>
                <Paper elevation={3} sx={{ p: 1 }}>
                    <Card color={textColor} sx={{ background: comparisonColor, p: 2 }}>
                        <Typography
                            gutterBottom
                            variant="h2"
                            component="div"
                            sx={{ color: textColor }}
                        >{`Product Review Analysis ${sentimentType}`}</Typography>
                        <Typography gutterBottom variant="h4" component="div" sx={{ color: overallSentimentColor }}>
                            Overall Sentiment Score: {amazonProductOverallSentimentScore}
                        </Typography>
                        <Typography gutterBottom variant="h3" component="div" sx={{ color: overallSentimentColor }}>
                            Overall Amazon Product Score: {amazonProductOverallScore}
                        </Typography>
                        <Grid container sx={{ mt: 3 }}>
                            <Grid item xs={12} md={4} sm={12} sx={{ pr: 1, pt: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#4caf50', color: '#fff', fontSize: 20 }}
                                    >
                                        Positive Reviews: {amazonProductOverallPositiveReviews}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12} sx={{ pr: 1, pt: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#F84D95', color: '#fff', fontSize: 20 }}
                                    >
                                        Negative Reviews: {amazonProductOverallNegativeReviews}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12} sx={{ pr: 1, pt: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#EDE7F6', color: '#000', fontSize: 20 }}
                                    >
                                        Neutral Reviews: {amazonProductOverallNeutralReviews}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Card>
                </Paper>
            </>
        );
    };

    //Flipkart Product - Function to render the results of the analysis
    const flipkartProductAnalysisResult = () => {
        let sentimentType = '';
        let textColor = '';
        let overallSentimentColor = '';
        let comparisonColor = '';

        if (flipkartProductOverallScore > amazonProductOverallScore) {
            textColor = '#fff';
            overallSentimentColor = '#ffeb3b';
            sentimentType = '👍🏻😍';
            comparisonColor = '#26a69a';
        } else if (amazonProductOverallScore > flipkartProductOverallScore) {
            textColor = '#fff';
            overallSentimentColor = '#ffeb3b';
            comparisonColor = '#F84D95';
            sentimentType = '👎🏻☹️';
        } else {
            textColor = '#000';
            overallSentimentColor = '#5E35B1';
            sentimentType = '🆗😐';
            comparisonColor = '#EDE7F6';
        }
        return (
            <>
                <Paper elevation={3} sx={{ p: 1 }}>
                    <Card color={textColor} sx={{ background: comparisonColor, p: 2 }}>
                        <Typography
                            gutterBottom
                            variant="h2"
                            component="div"
                            sx={{ color: textColor }}
                        >{`Product Review Analysis ${sentimentType}`}</Typography>
                        <Typography gutterBottom variant="h4" component="div" sx={{ color: overallSentimentColor }}>
                            Overall Sentiment Score: {flipkartProductOverallSentimentScore}
                        </Typography>
                        <Typography gutterBottom variant="h3" component="div" sx={{ color: overallSentimentColor }}>
                            Overall Flipkart Product Score: {flipkartProductOverallScore}
                        </Typography>
                        <Grid container sx={{ mt: 3 }}>
                            <Grid item xs={12} md={4} sm={12} sx={{ pr: 1, pt: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#4caf50', color: '#fff', fontSize: 20 }}
                                    >
                                        Positive Reviews: {flipkartProductOverallPositiveReviews}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12} sx={{ pr: 1, pt: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#F84D95', color: '#fff', fontSize: 20 }}
                                    >
                                        Negative Reviews: {flipkartProductOverallNegativeReviews}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12} sx={{ pr: 1, pt: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#EDE7F6', color: '#000', fontSize: 20 }}
                                    >
                                        Neutral Reviews: {flipkartProductOverallNeutralReviews}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Card>
                </Paper>
            </>
        );
    };

    //Function to render the complete Scrapped Data
    const comparisonResult = (i) => {
        var latestComparison = setLatestComparison(i);
        var { amazonProductData, flipkartProductData } = latestComparison;
        return (
            <Stack>
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} sm={6} md={6}>
                                <Grid item xs={12} sm={10} md={10} sx={{ pb: 4, px: 2 }}>
                                    <img
                                        src={amazonProductData.productImg}
                                        style={{ borderRadius: '10px' }}
                                        width="100%"
                                        height="100%"
                                        alt={amazonProductData.productTitle}
                                        loading="lazy"
                                    />
                                </Grid>
                                <Paper sx={{ p: 1 }}>
                                    <Typography gutterBottom variant="h3" component="div">
                                        {amazonProductData.productTitle}
                                    </Typography>
                                    <Typography gutterBottom variant="h2" component="div">
                                        Price: ₹{amazonProductData.productPrice}
                                    </Typography>
                                    <Typography gutterBottom variant="h3" component="div" color="#F84D95">
                                        Discount: {amazonProductData.discount} off
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Grid item xs={12} sm={10} md={10} sx={{ pb: 4, px: 2 }}>
                                    <img
                                        src={flipkartProductData.productImg}
                                        style={{ borderRadius: '10px' }}
                                        width="100%"
                                        height="100%"
                                        alt={flipkartProductData.productTitle}
                                        loading="lazy"
                                    />
                                </Grid>
                                <Paper sx={{ p: 1 }}>
                                    <Typography gutterBottom variant="h3" component="div">
                                        {flipkartProductData.productTitle}
                                    </Typography>
                                    <Typography gutterBottom variant="h2" component="div">
                                        Price: ₹{flipkartProductData.productPrice}
                                    </Typography>
                                    <Typography gutterBottom variant="h3" component="div" color="#F84D95">
                                        Discount: {flipkartProductData.discount}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Paper elevation={0} sx={{ background: 'transparent' }}>
                            <Grid container>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="h2" sx={{ p: 2 }}>
                                        Amazon Product Reviews
                                    </Typography>
                                    {amazonProductData.productReviews.map((review, index) => {
                                        const { profileName, reviewTitle, reviewText, customerRatings } = review;
                                        return (
                                            <Grid key={index} item sx={{ p: 1 }}>
                                                <Card sx={{ background: '#000000' }}>
                                                    <CardContent>
                                                        <Typography variant="h3">{reviewTitle}</Typography>
                                                        <Box sx={{ py: 2, display: 'flex' }}>
                                                            <Avatar sx={{ backgroundColor: '#f7dd77', color: 'black' }} />
                                                            <Typography variant="h5" color="text.secondary" sx={{ px: 2, py: 1 }}>
                                                                {profileName}
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="h4">{customerRatings}</Typography>
                                                        <Stack>{analyseAmazonProductText(reviewText)}</Stack>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="h2" sx={{ p: 2 }}>
                                        Flipkart Product Reviews
                                    </Typography>
                                    {flipkartProductData.productReviews.map((review, index) => {
                                        const { profileName, reviewTitle, reviewText, customerRatings } = review;
                                        return (
                                            <Grid key={index} item sx={{ p: 1 }}>
                                                <Card sx={{ background: '#000000' }}>
                                                    <CardContent>
                                                        <Typography variant="h3">{reviewTitle}</Typography>
                                                        <Box sx={{ py: 2, display: 'flex' }}>
                                                            <Avatar sx={{ backgroundColor: '#f7dd77', color: 'black' }} />
                                                            <Typography variant="h5" color="text.secondary" sx={{ px: 2, py: 1 }}>
                                                                {profileName}
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="h4">{customerRatings}.0 out of 5.0 Stars</Typography>
                                                        <Stack>{analyseFlipkartProductText(reviewText)}</Stack>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        </Paper>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={6}>
                                {amazonProductAnalysisResult(
                                    amazonProductData.productPrice,
                                    flipkartProductData.productPrice,
                                    amazonProductData.discount,
                                    flipkartProductData.discount
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                {flipkartProductAnalysisResult()}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Stack>
        );
    };

    const showError = () => {
        return (
            <Typography sx={{ m: 1, background: '#F8CE46', borderRadius: '2px', width: 'fit-content', padding: '2px' }} color="black">
                Error - Please use the right format for the link -{' '}
                <Link color="inherit" to="/guide">
                    Read Guidelines
                </Link>
            </Typography>
        );
    };

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' }
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleURLSubmit}
            >
                <TextField id="outlined-basic" size="small" name="amazonProductURL" label="Amazon Product URL" variant="outlined" />
                <TextField id="outlined-basic" size="small" name="flipkartProductURL" label="Flipkart Product URL" variant="outlined" />

                {!isLoading && (
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                )}
                {isLoading && <CircularProgress sx={{ ml: 2 }} color="primary" />}
            </Box>
            {isError ? showError() : ''}

            {isFormFilled ? comparisonResult(intraSiteProductsComparison.length - 1) : ''}
            {isSelected != -1 ? comparisonResult(isSelected) : ''}

            <Typography variant="h2" sx={{ m: 2 }}>
                Recent Comparisons
            </Typography>
            <Grid container>
                {intraSiteProductsComparison.map((product, index) => {
                    const { productTitle: amazonProductTitle } = product.amazonProductData;
                    const { productTitle: flipkartProductTitle } = product.flipkartProductData;
                    return (
                        <RecentIntroCompCard
                            key={index}
                            index={index}
                            handleURLSubmit={handleURLSubmit2}
                            amazonProductTitle={amazonProductTitle}
                            flipkartProductTitle={flipkartProductTitle}
                            AmazonLogo={AmazonLogo}
                            FlipkartLogo={FlipkartLogo}
                        />
                    );
                })}
            </Grid>
        </>
    );
};

export default CompareAmazonFlipkart;
