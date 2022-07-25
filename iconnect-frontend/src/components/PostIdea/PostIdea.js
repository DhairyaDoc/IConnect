import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  Grid,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ImageUploading from "react-images-uploading";
import UploadIcon from "../../assets/images/UploadIcon.svg";
import { postIdeas, editIdeas } from "../../store/actions/idea";

const PostIdea = (props) => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState();
  const [investmentRequired, setinvestmentRequired] = useState();
  const [shortDescription, setShortDescription] = useState();
  const [errorimg, setErrorimg] = useState();
  const [image, setImage] = useState();
  const [tempImage, setTempImage] = useState();
  const [files, setFiles] = useState();
  const [message, setMessage] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [editIdea, setEditIdea] = useState(false);

  const postIdea = useSelector((state) => state.ideaReducer.postIdea);
  useEffect(() => {
    if (props.idea) {
      setProjectName(props.idea.projectName);
      setinvestmentRequired(props.idea.investmentRequired);
      setShortDescription(props.idea.shortDescription);
      setImage(props.idea.image);
      setTempImage(props.idea.image);
      setEditIdea(true);
    }
  }, [props]);
  useEffect(() => {
    if (postIdea.message != null) {
      if (postIdea.success && !editIdea) {
        setMessage("Idea posted successfully");
      } else {
        setMessage(postIdea.message);
      }
      setShowAlert(true);
    }
  }, [postIdea]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChangeProjectName = (e) => {
    setProjectName(e.target.value);
  };
  const handleChangeInvestmentRequired = (e) => {
    setinvestmentRequired(e.target.value);
  };
  const handleChangeShortDescription = (e) => {
    setShortDescription(e.target.value);
  };
  const onChangeimage = (imageList, addUpdateIndex) => {
    const files = [];
    imageList.forEach((image) => {
      files.push(image.file);
    });
    setFiles(imageList);
    setErrorimg(null);
    setImage(imageList[0].data_url);
    setTempImage(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (image == null) {
      setErrorimg("Please upload the image");
    } else {
      setErrorimg(null);
      if (!editIdea) {
        dispatch(
          postIdeas({
            projectName,
            investmentRequired,
            shortDescription,
            image,
          })
        );
      } else {
        dispatch(
          editIdeas(
            {
              projectName,
              investmentRequired,
              shortDescription,
              image,
            },
            props.idea._id
          )
        );
      }
    }
  };
  const handleClose = () => {
    setShowAlert(false);
    window.location.reload();
  };
  const deleteimage = (event) => {
    setImage(null);
    setTempImage(null);
  };

  return (
    <div>
      <Card variant="outlined">
        <Dialog onClose={handleClose} open={showAlert}>
          <DialogContent>{message} </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
        <form onSubmit={handleSubmit} id="form">
          <CardContent>
            <Grid container spacing={5}>
              <Grid item md={12}>
                <TextField
                  label="Project Name"
                  name="projectName"
                  required
                  value={projectName}
                  onChange={(e) => handleChangeProjectName(e)}
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item md={12}>
                <div style={{ textAlign: "center", margin: "auto" }}>
                  <center>
                    <ImageUploading
                      multiple
                      value={files}
                      onChange={onChangeimage}
                      maxNumber={1}
                      maxFileSize={5242880}
                      acceptType={["jpg", "gif", "png"]}
                      onError={(errors, files) => {
                        if (errors) {
                          if (errors.maxNumber) {
                            setErrorimg("Cannot upload more than 1 image");
                          } else if (errors.acceptType) {
                            setErrorimg("Your selected file type is not allow");
                          } else if (errors.maxFileSize) {
                            setErrorimg("Selected file size exceed 5Mb");
                          } else if (errors.resolution) {
                            setErrorimg(
                              "Selected file is not match your desired resolution"
                            );
                          }
                        } else {
                          setErrorimg(null);
                        }
                      }}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        errors,
                      }) => (
                        <div className="upload__image-wrapper">
                          <div class="fileUploader ">
                            <div class="">
                              <div
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                tw="py-2"
                              >
                                <Grid item xs={12} md={6}>
                                  <div
                                    class="fileContainer"
                                    style={
                                      isDragging
                                        ? {
                                            border: "1px dashed black",
                                            padding: "10px",
                                            borderRadius: "4px",
                                            // height: "250px",
                                          }
                                        : {
                                            border: "1px dashed gray",
                                            borderRadius: "4px",
                                            padding: "10px",
                                            // height: "250px",
                                          }
                                    }
                                    {...dragProps}
                                  >
                                    <img
                                      src={UploadIcon}
                                      class="uploadIcon"
                                      alt="Upload Icon"
                                    />
                                    <p
                                      className="imgLabel"
                                      tw="text-xs text-gray-800"
                                      style={{ margin: "10px" }}
                                    >
                                      Max size:5mb, accepted: jpg | gif | png,
                                      Total images allowed: 5
                                    </p>
                                    {errorimg ? (
                                      <div class="errorsContainer">
                                        {errorimg}
                                      </div>
                                    ) : null}{" "}
                                    <button
                                      class="DnDbtn"
                                      onClick={(event) => {
                                        event.preventDefault();
                                        onImageUpload();
                                      }}
                                    >
                                      Click or Drag & Drop here
                                    </button>
                                  </div>{" "}
                                </Grid>
                              </div>
                              <br />
                              <div class="uploadPicturesWrapper">
                                <div
                                  style={{
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: " center",
                                    flexWrap: "wrap",
                                    width: "200%",
                                  }}
                                ></div>

                                {imageList.map((image, index) => (
                                  <div
                                    key={index}
                                    className="uploadPictureContainer"
                                    style={{ width: "30%" }}
                                  >
                                    <div
                                      class="deleteImage"
                                      onClick={() => onImageRemove(index)}
                                    >
                                      X
                                    </div>
                                    <img
                                      className="uploadPicture"
                                      alt={projectName}
                                      src={image.data_url}
                                      style={{
                                        width: "100%",
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                    <div class="uploadPicturesWrapper ">
                      <div
                        className=""
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: " center",
                          flexWrap: "wrap",
                          width: "100%",
                        }}
                      >
                        {tempImage != null ? (
                          <>
                            <div
                              class="uploadPictureContainer"
                              style={{ width: "30%" }}
                            >
                              <div
                                class="deleteImage"
                                onClick={(e) => deleteimage(e)}
                              >
                                X
                              </div>
                              <img
                                className="uploadPicture"
                                src={`${image}`}
                                alt={projectName}
                                style={{
                                  width: "100%",
                                }}
                              />
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>{" "}
                  </center>
                </div>
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Investment Required ($)"
                  required
                  fullWidth
                  type="number"
                  value={investmentRequired}
                  onChange={(e) => handleChangeInvestmentRequired(e)}
                  InputProps={{ disableunderline: "true" }}
                  variant="standard"
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Description"
                  rows={3}
                  multiline
                  required
                  fullWidth
                  value={shortDescription}
                  onChange={(e) => handleChangeShortDescription(e)}
                  InputProps={{ disableunderline: "true" }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container spacing={1}>
              <Grid item md={editIdea ? 6 : 12}>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  fullWidth
                >
                  Submit
                </Button>{" "}
              </Grid>
              {editIdea ? (
                <Grid item md={6}>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={props.handleEditModalClose}
                  >
                    Cancel
                  </Button>{" "}
                </Grid>
              ) : null}
            </Grid>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};

export default PostIdea;
