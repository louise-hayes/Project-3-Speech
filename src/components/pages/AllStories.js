import React, { Component } from "react";
import StoryPanel from "../../components/StoryPanel";
import API from "../../utils/api-axios";
import googleApi from "../../utils/googleApi";
import MailBtn from '../Buttons/MailBtn';
import DeleteBtn from '../Buttons/DeleteBtn';
import DriveBtn from '../Buttons/DriveBtn';
<<<<<<< HEAD
import PopoutList from '../List/PopoutList';
// import ListItem from '../List/ListItem';
// import Collapsible from "react-materialize";
// import CollapsibleItem from "react-materialize";
import {Row, Col} from "react-materialize";
=======
// import PopoutList from '../List/PopoutList';
import { Row, Col } from "react-materialize";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
>>>>>>> c88f40b351df31572f20b8cc7d2b1fe775da88a4

class AllStories extends Component {

    constructor(props) {
        super(props)
        this.state = {
            stories: [],
            title: "",
            words: ""
        }
        this.loadStories = this.loadStories.bind(this);
        this.delStory = this.delStory.bind(this)
        this.gdUploadStory = this.gdUploadStory.bind(this);
    }

    componentDidMount() {
        this.loadStories();
    };

    // Loads all stories
    loadStories() {
        API.getStories()
            .then(res =>
                // to do add in error checking here if no stories display heading and no stories
                // if (!res.data) {
                //   console.log("no stories");

                // }
                this.setState({ stories: res.data })
            )
            .catch(err => console.log(err));
    };

    // Deletes a story from the database with a given id, then reloads stories from the db
    delStory(id) {
        console.log("del story");
        API.deleteStory(id)
            .then(res => this.loadStories())
            .catch(err => console.log(err));
    };

    gdUploadStory(id, words) {
        console.log("Google Drive Upload clicked");
        googleApi.init()
            .then(() => {
                googleApi.saveFile(id, words)
                    .then(() => {
                        alert('File uploaded');
                        console.log('File uploaded');
                    });
            })
            .catch(err => {
                alert(err);
                console.log('error uploading to google drive ' + err);
            });
    };

    mailStory() {
        const msg = {
            to: 'connorjohnmelnick@gmail.com',
            from: 'test@example.com',
            subject: 'Sending with SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
        };

        API.mail(msg)
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


    render() {
        const theStories = this.state.stories.map(story => {
            return (
                <Row>
                    <Col l={8}>
<<<<<<< HEAD
                <StoryPanel key={story._id}>
                    <PopoutList>
                        {/* <ListItem key={story._id}> */}
                            <div className="collapsible-header">{story.title}</div>
                            <div className="collapsible-body"><span>{story.words}</span></div>
                        {/* </ListItem> */}
                    </PopoutList>

                    <DeleteBtn onClick={() => this.delStory(story._id)} />
                    <DriveBtn onClick={() => this.gdUploadStory(story._id, story.words)} />
                    <MailBtn subject={story.title} text={story.words} />
                </StoryPanel>
                </Col>
=======
                    <MuiThemeProvider>
                        <Card>
                            <CardHeader
                                title={story.title}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardText expandable={true}>
                                {story.words}
                            </CardText>
                            <CardActions>
                                <DeleteBtn label="delete" onClick={() => this.delStory(story._id)} />
                                <DriveBtn labelonClick={() => this.gdUploadStory(story._id, story.words)} />
                                <MailBtn subject={story.title} text={story.words} />
                            </CardActions>
                        </Card>
                        </MuiThemeProvider>
                    </Col>
>>>>>>> c88f40b351df31572f20b8cc7d2b1fe775da88a4
                </Row>
            )
        });
        return (
            <div>
                {theStories}
            </div>
        )
    }

};

export default AllStories;