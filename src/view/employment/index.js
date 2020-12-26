import React,{useState,useEffect} from 'react'
import{
    Grid,
    Paper, 
    Typography,
    makeStyles,
    Card,
    CardHeader,
    Button,
    CardContent,
    Avatar,
    CardMedia,
    Hidden,
    TextField,
    InputAdornment
} from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {ArrowBackIos,ArrowForwardIos,Add,Search} from '@material-ui/icons'
import { createMuiTheme, ThemeProvider,useTheme } from '@material-ui/core/styles';

import axios from 'axios'
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    cardContainer:{
        marginTop: '3vw',
    },
    detailCard:{
        display:'flex',
        [theme.breakpoints.down("sm")]:{
            flexDirection:'column'
        },
        [theme.breakpoints.up("sm")]:{
            flexDirection:'row'
        },
    },
    content: {
        flex: '1 0 auto',
    },
    titleContent:{
        fontWeight:700,
        fontSize:12,
        color:'#808080'
    },
    valueContent:{
        fontSize:12,
    },
    pictRoot: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
        justifyContent:'center'
    },
    sizePict:{
        [theme.breakpoints.up("sm")]:{
            height: theme.spacing(15),
            width: theme.spacing(15),
        },
        [theme.breakpoints.down("sm")]:{
            height: theme.spacing(12),
            width: theme.spacing(12),
            margin: '13px 15px'
        }
    },
    titleJumbo:{
        [theme.breakpoints.up('sm')]: {
            fontSize: 24,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 22,
        },
    },
    contentXs:{
        [theme.breakpoints.down("sm")]:{
            display:'flex'
        }
    }
}));

const theme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiCardHeader:{
        title:{
            fontSize:14
        }
      },
      MuiTextField:{
          root:{
              width:'100%'
          }
      }
    },
  });

const EmploymentComponent = (props) => {
    const styles = useStyles()
    const smMedia = useMediaQuery('(max-width: 650px)')
    const doubleCard = useMediaQuery('(min-width: 651px) and (max-width: 980px)')
    const [page, setPage] = useState(1)
    const [item, setItem] = useState([])
    const [allItem, setAllItem] = useState([])

    useEffect(() => {
        getListPersonel()
    }, [])

    useEffect(() => {
        const items = allItem.find(x=>x.page === page)
        if(items){
            setItem(items.data)
        }
    }, [page,allItem])

    const getListPersonel = () =>{
        try{
            axios.get('https://randomuser.me/api/',{
                params:{
                    results: 28,
                    inc: 'name,email,dob,picture',
                    seed: 'foobar'
                }
            })
            .then(({data})=>{
                const {results} = data
                let page = 1
                let allItem = []
                let pageItem = []
                for (let index = 0; index < results.length; index++) {
                    const element = results[index];
                    // setiap 4 item di jadikan 1 pages
                    pageItem.push({
                        id: Math.floor((Math.random() * 1000000) + 100000),
                        name: `${element.name.title}. ${element.name.first} ${element.name.last}`,
                        telp: element.phone,
                        birthdays:moment(element.dob.date).format("DD-MM"),
                        email: element.email,
                        pict:element.picture.large
                    })
                    if(((index + 1) % 4) === 0 ){
                        allItem.push({
                            page:page,
                            data: pageItem
                        })
                        page += 1
                        pageItem = []
                    }
                }
                setAllItem(allItem)
            })
        }catch(err){
            console.log(err)
        }
    }

    const cardSize = (doubleCard ? 6 : (smMedia? 12 : 3))
    const button = (doubleCard ? 10 : (smMedia? 8 : 4))
    const buttonContainer = (doubleCard ? 12 : (smMedia? 12 : 4))
    const buttonRow = (doubleCard ? 12 : (smMedia? 12 : 6))
    return (
        <div>
            <ThemeProvider theme={theme}>
                <Paper className={`jumbotron ${styles.paper}`}>
                    <Grid 
                    container
                    direction="row"
                    spacing={3}
                    >
                        <Grid item xs={8}>
                            <Grid container direction="column" spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="body1" className={`title ${styles.titleJumbo}`}>PERSONNEL LIST</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">List of all personnels</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={buttonContainer} >
                            <Grid container spacing={3}>
                                <Grid item xs={buttonRow}>
                                <TextField
                                    className={styles.margin}
                                    placeholder="Find Personnel"
                                    id="input-with-icon-textfield"
                                    variant="outlined"
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search className="color-primary"/>
                                        </InputAdornment>
                                    ),
                                    }}
                                />
                                </Grid>
                                <Grid item xs={buttonRow}>
                                    <Button
                                        fullWidth
                                        variant="text"
                                        size="large"
                                        className="color-white bg-primary"
                                        endIcon={<Add />}
                                    >
                                        ADD PERSONNEL
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
                <div
                className={styles.cardContainer}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {item.map((element,index)=>(
                                    <Grid item xs={cardSize} key={index.toString()}>
                                        <Card>
                                                <CardHeader 
                                                    title={
                                                        <>
                                                            <Typography variant="inherit" className="color-title cardTitle">Personel ID: </Typography>
                                                            <Typography variant="inherit" className="color-primary cardTitle">{element.id}</Typography>
                                                        </>
                                                    }
                                                />
                                                <div className={styles.contentXs}>
                                                    <Hidden smUp implementation="css">
                                                        <Avatar  alt={element.name} src={element.pict} className={styles.sizePict} />
                                                    </Hidden>
                                                    <div className={styles.detailCard}>
                                                        <CardContent className={styles.content}>
                                                            {/* photo */}
                                                            <Hidden xsDown implementation="css">
                                                                <div className={styles.pictRoot}>
                                                                    <Avatar alt={element.name} src={element.pict} className={styles.sizePict} />
                                                                </div>
                                                            </Hidden>
                                                            
                                                            {/* name */}
                                                            <div className="gap">
                                                                <Typography variant="body1" className={styles.titleContent}>Name</Typography>
                                                                <Typography variant="body1" className={styles.valueContent}>{element.name}</Typography>
                                                            </div>
                                                            {/* telp */}
                                                            <div className="gap">
                                                                <Typography variant="body1" className={styles.titleContent}>Telephone</Typography>
                                                                <Typography variant="body1" className={styles.valueContent}>{element.telp}</Typography>
                                                            </div>
                                                            {/* birthday */}
                                                            <div className="gap">
                                                                <Typography variant="body1" className={styles.titleContent}>Birthday</Typography>
                                                                <Typography variant="body1" className={styles.valueContent}>{element.birthdays}</Typography>
                                                            </div>
                                                            {/* email */}
                                                            <div className="gap">
                                                                <Typography variant="body1" className={styles.titleContent}>Birthday</Typography>
                                                                <Typography variant="body1" className={styles.valueContent}>{element.email}</Typography>
                                                            </div>
                                                        </CardContent>
                                                    </div>

                                                </div>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
                {/* pagination */}
                <div className="gap">
                    <Grid container justify="center" spacing={2}>
                        <Grid item xs={button}>
                                <Grid container justify="space-between" spacing={2}>
                                    <Grid item>
                                        <Button
                                            variant="text"
                                            size="small"
                                            className={page !== 1 && `color-primary`}
                                            startIcon={<ArrowBackIos />}
                                            disabled={page === 1}
                                            onClick={()=>{
                                                setPage(page-1)
                                            }}
                                        >
                                            {!smMedia &&
                                                `Previous Page`
                                            }
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="text"
                                            size="small"
                                            className={page !== (allItem.length) && `color-primary`}
                                            endIcon={<ArrowForwardIos />}
                                            disabled={page === (allItem.length)}
                                            onClick={()=>{
                                                setPage(page+1)
                                            }}
                                        >
                                            {!smMedia &&
                                                `Next Page`
                                            }
                                            
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                    </Grid>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default EmploymentComponent
