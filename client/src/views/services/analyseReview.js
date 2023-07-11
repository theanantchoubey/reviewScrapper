// material-ui
import { Button, TextField, Typography, Box, Stack, Card, CardContent, Grid, Paper, CircularProgress, Avatar } from '@mui/material';
import AmazonLogo from '../../assets/images/logos/amazon_logo.png';
// project imports
import { useState } from 'react';
import Sentiment from 'sentiment';
import axios from 'axios';
import { useEffect } from 'react';
import RecentAnalysisCard from 'ui-component/cards/RecentAnalysisCard';
import { Link } from 'react-router-dom';

const sentiment = new Sentiment();

// ==============================|| ANALYSE REVIEW PAGE ||============================== //

const AnalyseReview = () => {
    const [productData, setProductData] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [isSelected, setIsSelected] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);

    //Function to analyse the review sentiment and give score
    const analyseText = (text) => {
        let sentimentObj = sentiment.analyze(text);
        let score = sentimentObj.score;
        overallSentiment(score);
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

    //Function to show the latest analysis made
    const showLatest = () => {
        setIsError(false);
        setIsLoading(false);
        setIsFormFilled(true);
    };

    //Function to switch the latest analysis
    const switchLatest = () => {
        setIsLoading(false);
        setIsFormFilled(false);
    };

    //Function to show the selected analysis
    const showSelected = (i) => {
        setIsError(false);
        setIsLoading(false);
        setIsSelected(i);
    };

    //Function to switch the selected analysis
    const switchSelected = () => {
        setIsLoading(false);
        setIsSelected(-1);
    };

    //Function to fetch product data from the backend
    const fetchProductData = async () => {
        const currProductData = await axios.get('/analysis/productReviewAnalysisData').then(({ data }) => data);
        if (productData.length === currProductData.length && productData.length !== 0) {
            setIsError(true);
            setIsLoading(false);
        } else {
            if (productData.length !== 0) setTimeout(showLatest, 500);
            setProductData(currProductData);
        }
    };

    //Function to post the form to the backend
    const postURL = async (productURL) => {
        const stringifiedProductURL = JSON.stringify({ productURL: productURL });
        setTimeout(fetchProductData, 6000);
        // setTimeout(showLatest, 7000);
        try {
            await axios.post('/analysis/productReviewAnalysis', stringifiedProductURL, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            console.log(err.respose);
        }
    };

    //UseEffect Function
    useEffect(() => {
        fetchProductData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Function to set the latest analysis of particular index
    var setLatestAnalysis = (i) => {
        var latestAnalysis = productData[i];
        return latestAnalysis;
    };

    //Function to handle Form Submit - For URL
    const handleURLSubmit = (e) => {
        e.preventDefault();
        switchSelected();
        switchLatest();
        window.scrollTo(0, 0);
        setIsLoading(true);
        const str = e.target.productURL.value;
        if (str.substring(0, 22) != 'https://www.amazon.in/') {
            // console.log('Error! Please put right link.');
            setIsError(true);
            setIsLoading(false);
            e.target.productURL.value = '';
        } else {
            setIsError(false);
            postURL(e.target.productURL.value);
            e.target.productURL.value = '';
        }
    };

    //Function to handle Select Submit - For Recent Options
    const handleURLSubmit2 = (e) => {
        e.preventDefault();
        switchLatest();
        window.scrollTo(0, 0);
        showSelected(e.target.index.value);
    };

    //Variables for scoring
    let overallSentimentScore = 0;
    let overallNegativeReviews = 0;
    let overallPositiveReviews = 0;
    let overallNeutralReviews = 0;

    //Function to return overall Sentiment Score
    const overallSentiment = (reviewScore) => {
        if (reviewScore > 0) {
            ++overallPositiveReviews;
        } else if (reviewScore < 0) {
            ++overallNegativeReviews;
        } else {
            ++overallNeutralReviews;
        }
        overallSentimentScore += reviewScore;
        return overallSentimentScore;
    };

    //Function to render the results of the analysis
    const productAnalysisResult = () => {
        let sentimentType = '';
        let bgColor = '';
        let textColor = '';
        let overallSentimentColor = '';
        if (overallSentimentScore > 0) {
            sentimentType = '👍🏻😍';
            bgColor = '#26a69a';
            textColor = '#fff';
            overallSentimentColor = '#ffeb3b';
        } else if (overallSentimentScore < 0) {
            sentimentType = '👎🏻☹️';
            bgColor = '#F84D95';
            textColor = '#fff';
            overallSentimentColor = '#ffeb3b';
        } else {
            sentimentType = '🆗😐';
            bgColor = '#EDE7F6';
            textColor = '#000';
            overallSentimentColor = '#5E35B1';
        }
        return (
            <>
                <Paper elevation={3}>
                    <Card color={textColor} sx={{ background: bgColor, p: 2 }}>
                        <Typography
                            gutterBottom
                            variant="h2"
                            component="div"
                            sx={{ color: textColor }}
                        >{`Product Review Analysis ${sentimentType}`}</Typography>
                        <Typography gutterBottom variant="h3" component="div" sx={{ color: overallSentimentColor }}>
                            Overall Sentiment Score: {overallSentimentScore}
                        </Typography>
                        <Grid container spacing={1} sx={{ mt: 3 }}>
                            <Grid item xs={12} sm={6} md={4} sx={{ pr: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#4caf50', color: '#fff', fontSize: 20 }}
                                    >
                                        Positive Reviews: {overallPositiveReviews}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{ pr: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#F84D95', color: '#fff', fontSize: 20 }}
                                    >
                                        Negative Reviews: {overallNegativeReviews}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} sx={{ pr: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#EDE7F6', color: '#000', fontSize: 20 }}
                                    >
                                        Neutral Reviews: {overallNeutralReviews}
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
    const analysisResult = (i) => {
        var latestAnalysis = setLatestAnalysis(i);
        return (
            <Card>
                <Grid container sx={{ display: 'flex' }}>
                    <Grid item xs={12} sm={6} md={4} sx={{ py: 4, px: 4, borderRadius: 4 }}>
                        <img
                            src={latestAnalysis.productImg}
                            style={{ borderRadius: '10px' }}
                            width="100%"
                            height="100%"
                            alt={latestAnalysis.productTitle}
                            loading="lazy"
                        />
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ py: 4, px: 2 }}>
                        <Typography gutterBottom variant="h2" component="div">
                            {latestAnalysis.productTitle}
                        </Typography>
                        <Typography gutterBottom variant="h3" component="div">
                            Price: ₹{latestAnalysis.productPrice}
                        </Typography>
                        <Typography gutterBottom variant="h3" component="div" color="#ff7961">
                            Discount: {latestAnalysis.discount}
                        </Typography>
                    </Grid>
                </Grid>
                <Paper elevation={0} sx={{ background: 'transparent', color: '#000', p: 2, my: 2 }}>
                    <Typography variant="h1" sx={{ p: 2 }}>
                        Top Reviews
                    </Typography>
                    <Grid container>
                        {latestAnalysis.productReviews.map((review, index) => {
                            const { profileName, reviewTitle, reviewText, customerRatings } = review;
                            return (
                                <Card key={index} sx={{ background: '#000000', m: 1 }}>
                                    <CardContent>
                                        <Typography variant="h3">{reviewTitle}</Typography>
                                        <Box sx={{ py: 2, display: 'flex' }}>
                                            <Avatar sx={{ backgroundColor: '#f7dd77', color: 'black' }} />
                                            <Typography variant="h5" color="text.secondary" sx={{ px: 2, py: 1 }}>
                                                {profileName}
                                            </Typography>
                                        </Box>
                                        <Typography variant="h4">{customerRatings}</Typography>
                                        <Stack>{analyseText(reviewText)}</Stack>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </Grid>
                </Paper>
                {productAnalysisResult()}
            </Card>
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
                <TextField id="outlined-basic" size="small" name="productURL" label="Amazon Product URL" variant="outlined" />
                {!isLoading && (
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                )}
                {isLoading && <CircularProgress sx={{ ml: 2 }} color="primary" />}
            </Box>
            {isError ? showError() : ''}

            {isFormFilled ? analysisResult(productData.length - 1) : ''}
            {isSelected != -1 ? analysisResult(isSelected) : ''}

            <Typography variant="h2" sx={{ m: 2 }}>
                Recent Analysis
            </Typography>
            <Grid container>
                {productData.map((product, index) => {
                    return (
                        <RecentAnalysisCard
                            key={index}
                            handleURLSubmit={handleURLSubmit2}
                            index={index}
                            productTitle={product.productTitle}
                            productSite={product.productSite}
                            AmazonLogo={AmazonLogo}
                        />
                    );
                })}
            </Grid>
        </>
    );
};

export default AnalyseReview;
