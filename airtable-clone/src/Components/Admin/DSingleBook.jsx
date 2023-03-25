import styled from "styled-components";
import "./DBookCart.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  Pie,
  PieChart,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Bar,
  CartesianGrid,
} from "recharts";
import {
  Box,
  Image,
  Button,
  GridItem,
  Grid,
  Flex,
  Text,
  Container,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getUsers } from "../../Redux/AdminContext/action";
import {
  getCheckPoint,
  getEvents,
  getTasks,
  updateEvent,
} from "../../Redux/AppContext/actions";
import { DSingleUserPage } from "./DSingleUserPage";

const DSingleBook = () => {
  const { id } = useParams();

  const tasks = useSelector((store) => store.AppReducer.tasks);
  console.log("🚀 ~ file: DSingleBook.jsx:14 ~ DSingleBook ~ tasks", tasks);
  let userEvents = useSelector((store) => store.AppReducer.events);
  const checkPoints = useSelector((store) => store.AppReducer.checkPoint);

  const [checkedUserId, setCheckedUserId] = useState("");
  const [detail, setDetail] = useState("");
  const [showDetail, setShowDetail] = useState(detail);
  const { isOpen, onOpen, onClose } = useDisclosure();

  userEvents?.forEach((item) => {
    item.start = new Date(item.start);
    item.end = new Date(item.end);
   
  });

  if (userEvents.length > 0) 

  {
    userEvents = userEvents.filter((item) => item.userID === checkedUserId);
  }

  const users = useSelector((store) => store.AdminReducer.users);
  // console.log("🚀 ~ fil", users);

  const [currentuser, setCurrentUser] = useState([]);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const filterByParamTags = (task) => {
    const tagsInTheParams = searchParams.getAll("tags");
    if (tagsInTheParams.includes("All") || tagsInTheParams.length === 0) {
      return task;
    }
    const data = task.tags.filter((elem) => {
      if (tagsInTheParams.includes(elem)) {
        return true;
      }
      return false;
    });
    if (data.length) {
      return task;
    }
    return false;
  };

 

  useEffect(() => {
    checkPoints.length > 0 &&
      checkPoints.map((elem) => {
        if (elem.checkValidate === true) {
          setCheckedUserId(elem.mailID);
        }
      });
  }, [checkPoints.length]);



  useEffect(() => {
    if (users.length === 0) {
      dispatch(getUsers());
    }
  }, [users.length, dispatch]);

  useEffect(() => {
    if (id) {
      const user = users.find((item) => item.id == id);

      console.log(user.todos);
      users && setCurrentUser(user);
    }
  }, [id]);

  useEffect(() => {
    if (tasks.length === 0) {
      dispatch(getTasks());
    }
   
  }, [dispatch, tasks.length]);

  const data = [
    { name: "Todos", value: 4 },
    { name: "Calender", value: 3 },
  ];

  return (
    <>
      <Box
        width={"70%"}
        margin="auto"
        marginBottom="50px"
        marginTop="50px"
        boxShadow="rgba(0, 0, 0, 0.50) 0px 5px 15px"
        padding={"20px "}
        borderRadius={"5px"}
        backgroundColor={"rgb(160, 227, 252)"}
      >
        <Grid
          width={"70%"}
          margin={"auto"}
          gridTemplateColumns={{
            lg: "repeat(2,1fr)",
            md: "repeat(1,1fr)",
            sm: "repeat(1,1fr)",
            base: "repeat(1,1fr)",
          }}
          gap={"50px"}
        >
          <GridItem>
            <Image
              boxShadow={"rgba(43, 64, 70, 0.30) 0px 12px 32px"}
              margin={"auto"}
              padding={"20px"}
              width={{ lg: "200px", md: "200px", sm: "200px" }}
              // width={"100%"}
              borderRadius={"50%"}
              src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
            />
          </GridItem>
          <GridItem
            marginLeft={"-50px"}
            textAlign="left"
            width="75%"
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            {/* <p style={{fontSize:"15px",marginBottom:"-12px"}}>User Name :</p> */}
            <h1 style={{ fontSize: "40px", fontWeight: "bold" }}>
              {currentuser.userName}
            </h1>
            {/* <p style={{fontSize:"15px",marginBottom:"-9px"}}>User Email :</p> */}
            <h1
              style={{
                textAlign: "left",
                fontSize: "20px",
                marginBottom: "5px",
              }}
            >
              {currentuser.userEmail}
            </h1>
            {/* <p style={{fontSize:"15px",marginBottom:"-12px"}}>User Type :</p> */}
            <p
              style={{
                textAlign: "left",
                fontSize: "19px",
                fontSize: "30px",
                fontWeight: "bold",
              }}
            >
              {currentuser.userType}
            </p>
          </GridItem>
        </Grid>
      </Box>

      <Box style={{textAlign:"center"}}>
        <h1 style={{fontSize:"40px",fontWeight:"bold",color:"#3174ad"}}>Users Data</h1>
        <Box display={"flex"}
        justifyContent="space-around"
        alignItems={"center"}
        >
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />

            <Tooltip />
          </PieChart>

          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="value" fill="#8884d8" background={{ fill: "#eee" }} />
          </BarChart>
        </Box>
      </Box>

      <Tabs width={"60%"} margin={"auto"} textAlign={"center"}>
        <TabList>
          <Tab>Show Todos</Tab>
          <Tab>Show Calender</Tab>
        </TabList>

        <TabPanels width={"80%"}>
          <TabPanel>
            <Box
              className="todos"
              width={"full"}
              display={"grid"}
              templateColumns={{
                lg: "repeat(4,1fr)",
                md: "repeat(3,1fr)",
                sm: "repeat(2,1fr)",
                base: "repeat(2,1fr)",
              }}
            >
              <Grid
                w="full"
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  sm: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(4, 1fr)",
                }}
                gap={8}
                padding="0px  20px"
                paddingTop="5px"
                margin={"auto"}
                justifyContent={"space-evenly"}
                align="center"
              >
                {tasks.length > 0 &&
                  tasks
                    .filter((item) => item.userID === currentuser.userEmail)

                    .map((item) => {
                    
                      
                      return (
                        



                        <GridItem
                          _hover={{ transform: "translateY(-1vmax)" }}
                          key={item.id}
                          justify={"center"}
                          align="center"
                          border={"1px solid grey"}
                          padding={"10px"}
                          borderRadius={"10px"}
                        >
                          <DSingleUserPage
                            key={item.id}
                           
                            {...item}
                            colorScheme="red"
                          />
                        </GridItem>
                      );
                    })}
              </Grid>
            </Box>
          </TabPanel>
        
        
        </TabPanels>
      </Tabs>
    </>
  );
};

export default DSingleBook;