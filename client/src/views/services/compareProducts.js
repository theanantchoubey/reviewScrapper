// material-ui
import {
    Button,
    TextField,
    Typography,
    Box,
    Stack,
    Card,
    CardContent,
    Grid,
    Paper,
    CircularProgress,
    Select,
    MenuItem,
    Avatar,
    InputLabel,
    FormControl
} from '@mui/material';
// project imports
import { useState } from 'react';
import Sentiment from 'sentiment';
import axios from 'axios';
import { useEffect } from 'react';
import AmazonLogo from '../../assets/images/logos/amazon_logo.png';
import FlipkartLogo from '../../assets/images/logos/flipkart_logo.png';
import RecentCompCard from 'ui-component/cards/RecentCompCard';
import { Link } from 'react-router-dom';
import { DATABASE_URL } from './helper';
const sentiment = new Sentiment();

// ==============================|| ANALYSE REVIEW PAGE ||============================== //

const CompareProducts = () => {
    const [productsComparison, setProductsComparison] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [isSelected, setIsSelected] = useState(-1);
    const [isLoading, setIsLoading] = useState(false);
    const [productCompany, setProductCompany] = useState('');

    //Product One - Function to analyse the review sentiment and give score
    const analyseProductOneText = (text) => {
        let sentimentObj = sentiment.analyze(text);
        let score = sentimentObj.score;
        productOneOverallSentiment(score);
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

    //Product Two - Function to analyse the review sentiment and give score
    const analyseProductTwoText = (text) => {
        let sentimentObj = sentiment.analyze(text);
        let score = sentimentObj.score;
        productTwoOverallSentiment(score);
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
            textColor = '#000';
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
        const productsComparedData = await axios.get(`${DATABASE_URL}/comparison/productsComparisonData`).then(({ data }) => data);
        if (productsComparison.length === productsComparedData.length) {
            setIsError(true);
            setIsLoading(false);
        } else {
            if (productsComparison.length !== 0) setTimeout(showLatestComparison, 500);
            setProductsComparison(productsComparedData);
        }
    };

    //Function to post the form to the backend
    const postProductsURL = async (productsURLData) => {
        // console.log(productsURLData);
        const stringifiedProductsURLData = JSON.stringify(productsURLData);
        setTimeout(fetchProductsData, 6000);
        // setTimeout(showLatestComparison, 7000);
        try {
            await axios.post(`${DATABASE_URL}/comparison/productsComparison`, stringifiedProductsURLData, {
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (err) {
            console.log(err.respose);
        }
    };

    //Use Effect Function
    useEffect(() => {
        fetchProductsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //Handle Company Change
    const handleCompanyChange = (e) => {
        setProductCompany(e.target.value);
    };

    // Function to set the latest comparison of particular index
    var setLatestComparison = (i) => {
        var latestComparison = productsComparison[i];
        return latestComparison;
    };

    //Function to handle Form Submit - For URLs
    const handleURLSubmit = (e) => {
        e.preventDefault();
        switchSelectedComparison();
        switchLatestComparison();
        window.scrollTo(0, 0);
        setIsLoading(true);

        let productOneURL = e.target.productOneURL.value;
        let productTwoURL = e.target.productTwoURL.value;
        let productCompany = e.target.productCompany.value;
        // console.log(productOneURL + productTwoURL);

        if (
            productCompany === 'Amazon' &&
            (productOneURL.substring(0, 22) != 'https://www.amazon.in/' || productTwoURL.substring(0, 22) != 'https://www.amazon.in/')
        ) {
            console.log('Error! Please put right link.');
            setIsError(true);
            setIsLoading(false);
        } else if (
            productCompany === 'Flipkart' &&
            (productOneURL.substring(0, 25) != 'https://www.flipkart.com/' || productTwoURL.substring(0, 25) != 'https://www.flipkart.com/')
        ) {
            console.log('Error! Please put right link.');
            setIsError(true);
            setIsLoading(false);
        } else {
            setIsError(false);
            postProductsURL({
                productOneURL: productOneURL,
                productTwoURL: productTwoURL,
                productCompany: productCompany
            });
        }

        e.target.productOneURL.value = '';
        e.target.productTwoURL.value = '';
        setProductCompany('');
    };

    //Function to handle Select Submit - For Recent Options
    const handleURLSubmit2 = (e) => {
        e.preventDefault();
        switchLatestComparison();
        window.scrollTo(0, 0);
        showSelectedComparison(e.target.index.value);
    };

    let productOneOverallScore = 0;
    let productTwoOverallScore = 0;
    let productOneOverallSentimentScore = 0;
    let productOneOverallPositiveReviews = 0;
    let productOneOverallNegativeReviews = 0;
    let productOneOverallNeutralReviews = 0;
    let productTwoOverallSentimentScore = 0;
    let productTwoOverallPositiveReviews = 0;
    let productTwoOverallNegativeReviews = 0;
    let productTwoOverallNeutralReviews = 0;

    //Product One - Function to return Product One Sentiment Score
    const productOneOverallSentiment = (reviewScore) => {
        if (reviewScore > 0) {
            ++productOneOverallPositiveReviews;
        } else if (reviewScore < 0) {
            ++productOneOverallNegativeReviews;
        } else {
            ++productOneOverallNeutralReviews;
        }
        productOneOverallSentimentScore += reviewScore;
        return productOneOverallSentimentScore;
    };

    //Product Two - Function to return Product Two Sentiment Score
    const productTwoOverallSentiment = (reviewScore) => {
        if (reviewScore > 0) {
            ++productTwoOverallPositiveReviews;
        } else if (reviewScore < 0) {
            ++productTwoOverallNegativeReviews;
        } else {
            ++productTwoOverallNeutralReviews;
        }
        productTwoOverallSentimentScore += reviewScore;
        return productTwoOverallSentimentScore;
    };

    //Overall - Function to return overall Sentiment Score
    const overallComparison = (productOnePrice, productTwoPrice, productOneDiscount, productTwoDiscount) => {
        if (productOneOverallSentimentScore > productTwoOverallSentimentScore) {
            ++productOneOverallScore;
        } else if (productOneOverallSentimentScore < productTwoOverallSentimentScore) {
            ++productTwoOverallScore;
        }
        if (productOneOverallPositiveReviews > productTwoOverallPositiveReviews) {
            ++productOneOverallScore;
        } else if (productOneOverallPositiveReviews < productTwoOverallPositiveReviews) {
            ++productTwoOverallScore;
        }
        if (productOneOverallNegativeReviews > productTwoOverallNegativeReviews) {
            ++productTwoOverallScore;
        } else if (productOneOverallNegativeReviews < productTwoOverallNegativeReviews) {
            ++productOneOverallScore;
        }
        if (productOnePrice < productTwoPrice) {
            ++productOneOverallScore;
        } else if (productOnePrice > productTwoPrice) {
            ++productTwoOverallScore;
        }
        if (productOneDiscount < productTwoDiscount) {
            ++productTwoOverallScore;
        } else if (productOneDiscount > productTwoDiscount) {
            ++productOneOverallScore;
        }
    };

    //Product One - Function to render the results of the analysis
    const productOneAnalysisResult = (productOnePrice, productTwoPrice, productOneDiscount, productTwoDiscount) => {
        overallComparison(productOnePrice, productTwoPrice, productOneDiscount, productTwoDiscount);
        let sentimentType = '';
        let textColor = '';
        let overallSentimentColor = '';
        let comparisonColor = '';

        if (productOneOverallScore > productTwoOverallScore) {
            textColor = '#fff';
            overallSentimentColor = '#ffeb3b';
            sentimentType = '👍🏻😍';
            comparisonColor = '#26a69a';
        } else if (productOneOverallScore < productTwoOverallScore) {
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

        return (
            <>
                <Paper elevation={3} sx={{ p: 1 }}>
                    <Card color={textColor} sx={{ background: comparisonColor, p: 2 }}>
                        <Typography
                            gutterBottom
                            variant="h2"
                            component="div"
                            sx={{ color: textColor }}
                        >{`Product One Review Analysis ${sentimentType}`}</Typography>
                        <Typography gutterBottom variant="h3" component="div" sx={{ color: overallSentimentColor }}>
                            Overall Sentiment Score: {productOneOverallSentimentScore}
                        </Typography>
                        <Typography gutterBottom variant="h3" component="div" sx={{ color: overallSentimentColor }}>
                            Overall Product One Score: {productOneOverallScore}
                        </Typography>
                        <Grid container sx={{ mt: 3 }}>
                            <Grid item xs={12} md={4} sm={12} sx={{ pr: 1, pt: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#4caf50', color: '#fff', fontSize: 20 }}
                                    >
                                        Positive Reviews: {productOneOverallPositiveReviews}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12} sx={{ pr: 1, pt: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#F84D95', color: '#fff', fontSize: 20 }}
                                    >
                                        Negative Reviews: {productOneOverallNegativeReviews}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12} sx={{ pr: 1, pt: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#EDE7F6', color: '#000', fontSize: 20 }}
                                    >
                                        Neutral Reviews: {productOneOverallNeutralReviews}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Card>
                </Paper>
            </>
        );
    };

    //Product One - Function to render the results of the analysis
    const productTwoAnalysisResult = () => {
        let sentimentType = '';
        let textColor = '';
        let overallSentimentColor = '';
        let comparisonColor = '';

        if (productTwoOverallScore > productOneOverallScore) {
            textColor = '#fff';
            overallSentimentColor = '#ffeb3b';
            sentimentType = '👍🏻😍';
            comparisonColor = '#26a69a';
        } else if (productOneOverallScore > productTwoOverallScore) {
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
                        >{`Product Two Review Analysis ${sentimentType}`}</Typography>
                        <Typography gutterBottom variant="h3" component="div" sx={{ color: overallSentimentColor }}>
                            Overall Sentiment Score: {productTwoOverallSentimentScore}
                        </Typography>
                        <Typography gutterBottom variant="h3" component="div" sx={{ color: overallSentimentColor }}>
                            Overall Product Two Score: {productTwoOverallScore}
                        </Typography>
                        <Grid container sx={{ mt: 3 }}>
                            <Grid item xs={12} md={4} sm={12} sx={{ pr: 1, pt: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#4caf50', color: '#fff', fontSize: 20 }}
                                    >
                                        Positive Reviews: {productTwoOverallPositiveReviews}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12} sx={{ pr: 1, pt: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#F84D95', color: '#fff', fontSize: 20 }}
                                    >
                                        Negative Reviews: {productTwoOverallNegativeReviews}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={4} sm={12} sx={{ pr: 1, pt: 1 }}>
                                <Paper elevation={4}>
                                    <Typography
                                        variant="h4"
                                        sx={{ px: 2, py: 1, borderRadius: 2, background: '#EDE7F6', color: '#000', fontSize: 20 }}
                                    >
                                        Neutral Reviews: {productTwoOverallNeutralReviews}
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
        var { productOneData, productTwoData } = latestComparison;
        return (
            <Stack sx={{ p: 0 }}>
                <Card>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={12} sm={6} md={6}>
                                <Grid item xs={12} sm={10} md={10} sx={{ pb: 4, px: 2 }}>
                                    <img
                                        src={productOneData.productImg}
                                        style={{ borderRadius: '10px' }}
                                        width="100%"
                                        height="100%"
                                        alt={productOneData.productTitle}
                                        loading="lazy"
                                    />
                                </Grid>
                                <Paper sx={{ p: 1 }}>
                                    <Typography gutterBottom variant="h3" component="div">
                                        {productOneData.productTitle}
                                    </Typography>
                                    <Typography gutterBottom variant="h2" component="div">
                                        Price: ₹{productOneData.productPrice}
                                    </Typography>
                                    <Typography gutterBottom variant="h3" component="div" color="#F84D95">
                                        Discount: {productOneData.discount}
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <Grid item xs={12} sm={10} md={10} sx={{ pb: 4, px: 2 }}>
                                    <img
                                        src={productTwoData.productImg}
                                        style={{ borderRadius: '10px' }}
                                        width="100%"
                                        height="100%"
                                        alt={productTwoData.productTitle}
                                        loading="lazy"
                                    />
                                </Grid>
                                <Paper sx={{ p: 2 }}>
                                    <Typography gutterBottom variant="h3" component="div">
                                        {productTwoData.productTitle}
                                    </Typography>
                                    <Typography gutterBottom variant="h2" component="div">
                                        Price: ₹{productTwoData.productPrice}
                                    </Typography>
                                    <Typography gutterBottom variant="h3" component="div" color="#F84D95">
                                        Discount: {productTwoData.discount}
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Paper elevation={0} sx={{ background: 'transparent' }}>
                            <Grid container>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="h2" sx={{ p: 2 }}>
                                        Product One Reviews
                                    </Typography>
                                    {productOneData.productReviews.map((review, index) => {
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
                                                        <Stack>{analyseProductOneText(reviewText)}</Stack>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <Typography variant="h2" sx={{ p: 2 }}>
                                        Product Two Reviews
                                    </Typography>
                                    {productTwoData.productReviews.map((review, index) => {
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
                                                        <Stack>{analyseProductTwoText(reviewText)}</Stack>
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
                                {productOneAnalysisResult(
                                    productOneData.productPrice,
                                    productTwoData.productPrice,
                                    productOneData.discount,
                                    productTwoData.discount
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                {productTwoAnalysisResult()}
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
                <TextField id="outlined-basic" size="small" name="productOneURL" label="Product One URL" variant="outlined" />
                <TextField id="outlined-basic" size="small" name="productTwoURL" label="Product Two URL" variant="outlined" />
                <FormControl size="small">
                    <InputLabel id="demo-select-small">Product Company</InputLabel>
                    <Select
                        value={productCompany}
                        labelId="demo-select-small"
                        id="demo-select-small"
                        label="Product Company"
                        name="productCompany"
                        onChange={handleCompanyChange}
                    >
                        <MenuItem value="Amazon">Amazon</MenuItem>
                        <MenuItem value="Flipkart">Flipkart</MenuItem>
                    </Select>
                </FormControl>

                {!isLoading && (
                    <Button variant="contained" type="submit">
                        Submit
                    </Button>
                )}
                {isLoading && <CircularProgress sx={{ ml: 2 }} color="primary" />}
            </Box>
            {isError ? showError() : ''}

            {isFormFilled ? comparisonResult(productsComparison.length - 1) : ''}
            {isSelected != -1 ? comparisonResult(isSelected) : ''}

            <Typography variant="h2" sx={{ m: 2 }}>
                Recent Comparisons
            </Typography>
            <Grid container>
                {productsComparison.map((product, index) => {
                    const { productTitle: productOneTitle } = product.productOneData;
                    const { productTitle: productTwoTitle } = product.productTwoData;
                    const Logo = product.productsSite == 'Flipkart' ? FlipkartLogo : AmazonLogo;
                    return (
                        <RecentCompCard
                            key={index}
                            index={index}
                            productsSite={product.productsSite}
                            handleURLSubmit={handleURLSubmit2}
                            productOneTitle={productOneTitle}
                            productTwoTitle={productTwoTitle}
                            Logo={Logo}
                        />
                    );
                })}
            </Grid>
        </>
    );
};

export default CompareProducts;
