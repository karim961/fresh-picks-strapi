# Ittihad Website CMS

## Table of Contents

- [Setup](#setup)
- [Running](#running)
- [Documentation](#documentation)

## Setup

### - Initial Setup

_Mainly this script installs project dependencies and copy uploads into its corresponding folder._

```bash
sh ./install.sh
```

### - Database Setup

Database is restored with name `strapi`. To rename the database before restoring, rename folder `./setup/backup/db_dump/strapi` into `./setup/backup/db_dump/mydbname`.

```bash
# Import data into db named "strapi"
mongorestore ./setup/backup/db_dump
```

For Backup use the following:

```bash
# Backup using psql
mongodump --db strapi
```

## Running

[Back to the Table of Content](#table-of-contents)

### - Development

Create a `.env` file at project root with database credentials for connection

```python
DATABASE_PORT=5432
DATABASE_NAME=dbname
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
```

```bash
# run development server
yarn develop

# or if you want to make changes on Strapi's frontend
yarn develop --watch-admin
```

### - UAT / Production

Create `.env.uat` or `.env.prod` for your environment variables

```bash
# make sure pm2 is installed globally
yarn global add pm2

# build your Strapi instance
yarn build:prod # or yarn build:uat

# we have a special command for Windows :)
yarn build:prod:windows # or yarn build:uat:windows

# after building run your Strapi CMS
yarn start:prod # or yarn start:uat

# same start command for windows!
```

<br />

## Documentation

### Navigate To:

- [Components](#components)
- [Sections](#sections)
- [Collection Types](#collection-types)
- [Single Types](#single-types)
- [Back to the Table of Content](#table-of-contents)

---

## Components

```diff
- PS: All the fields of our components are optional unless specified otherwise and can be omitted whenever needed forming multiple versions of the same component.
```

### 1) Rich-Display

    This component consist of 5 fields:
    - text  (type: Text)
    - url   (type: Text)
    - icon  (type: Media)
    - image (type: Media)
    - type  (type: Enumeration)
    - page  (type: One to One relation with the Page collection type)

```diff
- PS: Check Collection type section for more info on the Page Collecion Type.
```

### Description

The component is by far the most reusable component in the cms.
It can be used to repesent a simple link, a button (navigational button/ submit button) or a social icon.

```diff
- PS: All fields are optional therefore the component offers a lot of choices on how to be used.
```

#### A) In The Cms:

1. **Empty Entry**

   ![Screenshot (132)](https://user-images.githubusercontent.com/61231052/102892459-91e62a00-4468-11eb-9d85-da4bceb6d0b3.png)

2. **Filled Entry**

   ![image](https://user-images.githubusercontent.com/61231052/102892977-657edd80-4469-11eb-9207-f99da1576322.png)

#### Lets break it down

1.  First of all the **Text** field represents what will the Rich Display hold as text wether it is of type button, link, social, submit or default.

2.  The **Icon** field. This field holds the icon associated with the Rich Display, in the filled entry example seen above, you can notice that we are using font awesome for our icons therefore filling in the full **Font Awesome** icon name in the field does the job.

3.  The **Url** field. This field is required when the intended behavior of the Rich-Display is to navigate us to an external Url and **not an internal page of the website/ submitting a form.** In the filled example the Url field is left out because our Rich-Display is of type Button and navigates us to an internal page called Contact using the Page field (_check breakdown of field number 6 below_).

```diff
 PS:THE URL FIELS SHOULD NOT BE FILLLED IN ANY OTHER CASE THAN THE ONE MENTIONED ABOVE
```

4.  The **Image** field, this allows you to add an image to your Rich-Display if needed.

    **a) Image Field:**

    ![image](https://user-images.githubusercontent.com/61231052/102895555-919c5d80-446d-11eb-930b-5c4f928afbf3.png)

    **b) Adding assets upon clicking the field:**

    ![Screenshot (142)](https://user-images.githubusercontent.com/61231052/103352285-7e614180-4aae-11eb-818f-69caca0de35a.png)

5.  The **Type** field. This field lets you choose the type of your Rich-Display.

    **a) Choosing the Type:**

    ![image](https://user-images.githubusercontent.com/61231052/102894305-8fd19a80-446b-11eb-93a4-7f02b1c6d66d.png)

6.  The **Page** field. This One to One relation field with the Page [Collection Type](#collection-types) lets you specify which **Internal** page of the website the Rich-Display will navigate to once clicked.

    **a) Choosing which internal page to navigate to:**

    ![image](https://user-images.githubusercontent.com/61231052/102894729-374ecd00-446c-11eb-9fb8-99de102420c6.png)

```diff
PS:THE PAGE FIELD SHOULD BE LEFT EMPTY IN THE CASE WHERE THE RICH-DISPLAY IS OF TYPE SUBMIT
```

#### B) In the Front-End :

**THIS IS A LANDING PAGE:**

![Screenshot (2)](https://user-images.githubusercontent.com/61231052/98371854-83bd8500-2045-11eb-9f99-aa7d9c97116d.png)

#### Let's check how many forms of the Rich Display we can find in this Sample Landing Page.

1.  From left to right: a Rich Display of type _button_ and another of type _link_ **(both used to Navigate to internal pages of the website using the Page field)** :

    ![Screenshot (3)](https://user-images.githubusercontent.com/61231052/98372336-3ee61e00-2046-11eb-958c-d6f8d00cef4b.png)

2.  In the Navigation Bar, we have several Rich Displays of type **link** (ex:Home, About etc...) and one of type **button** (ex: Consultancy)

    ![Screenshot (4)](https://user-images.githubusercontent.com/61231052/98372520-8d93b800-2046-11eb-8c1a-b1a016005e47.png)

3.  Rich Display of type **social**. This represents a social icon that is clickable

    ![Screenshot (2)](https://user-images.githubusercontent.com/61231052/98372472-7e146f00-2046-11eb-8b2c-ec58bcf30d47.jpg)

4.  Rich Display of type submit can take any form but is usually a button and inside a form. Its functionality differs and is used to submit a form instead of navigating the user to an internal or external page.

    ![Screenshot (144)](https://user-images.githubusercontent.com/61231052/103353127-a6ea3b00-4ab0-11eb-8b52-786590517ee6.png)

---

### 2) Rich-Content

    This component only contains a single field:
    - content (type: Rich Text)

### Description

This Component offers an interesting alternative to plain text, all because of the content rich text field.
Rich text is more exciting than plain text. It supports text formatting, such as bold, italics, and underlining, as well as different fonts, font sizes, and colored text as well as links such as http://www.github.com/.
Rich text documents can also include page formatting options, such as custom page margins, line spacing, and tab widths.
So whenever this kind of customization is needed one is expected to use the **Rich-Content Component**.

#### A) In the CMS:

1. **Filling Rich-Content in Strapi**

   ![rich-content strapi (2)](https://user-images.githubusercontent.com/61231052/98385407-9ccf3180-2057-11eb-8bdc-bb228be6543d.png)

#### B) In the Front-End:

1. **A Rich Content Component**

   ![Screenshot (146)](https://user-images.githubusercontent.com/61231052/103355137-30e8d280-4ab6-11eb-9e8d-84e6a256aefd.png)

---

### 3) Header-Description

     This component is formed of 3 fields:
     - title       (type: Text)
     - description (type: Text)
     - logo        (type: Media)

### Description

Header-Description is used at the head of a component or section introducing and describing the expected content to be displayed.

#### A) In the CMS:

**Empty Header Description in Strapi**
![Screenshot (147)](https://user-images.githubusercontent.com/61231052/103510882-b1b91d00-4e6e-11eb-9798-5214c6221204.png)

#### Lets break it down

1.  The **Title** field, this field represents the title part of the Header Description at the top of a Section/Component.

    ![image](https://user-images.githubusercontent.com/61231052/103511408-af0af780-4e6f-11eb-9eda-242598de982f.png)

2.  The **Description** field, directly following the title field this component is a short text briefly describing the component or section to come.

    ![image](https://user-images.githubusercontent.com/61231052/103512057-c8607380-4e70-11eb-8e6e-70b209a5e02e.png)

#### B) Front-End examples:

1.  **Header-Description at the head of a Section**

    ![Screenshot (5)](https://user-images.githubusercontent.com/61231052/98387461-149e5b80-205a-11eb-9bb7-230633f6877c.png)

2.  **Header-Description at the head of a Component**

    ![Screenshot (7)](https://user-images.githubusercontent.com/61231052/98389773-32b98b00-205d-11eb-837d-dcb512644b38.png)

---

### 4) Media

     This component is formed of 4 fields:
     - media       (type: Media)
     - title       (type: Text)
     - description (type: Text)
     - url         (type: Text)

### Description

The Media Component is highly versatile and can be used wherever the display of media content is needed (Like the Gallery-Block and/or Carousel).
It also offers the ability to assign to the media content (image or video), a title, description and url using the respective fields of the same name.

```diff
-PS: Making use of the idea of optional fields mentioned in the start of this section, this component can be used to represent a simple image or logo using the media field and omitting the rest.
```

#### A) In The CMS:

1.  A Media Component as a Carousel Item:

    ![image](https://user-images.githubusercontent.com/61231052/103516854-debefd00-4e79-11eb-858f-5771753b017c.png)

    **How it Looks on the Front-End**

    ![image](https://user-images.githubusercontent.com/61231052/103517429-c1d6f980-4e7a-11eb-9a7b-1fe44b2ce711.png)

    #### Lets break it down

    1. The **Media** field, this field represents the media content to be displayed, it can represent either an image or a video. Filling the media field is the same as adding the Image field in the [Rich Display](#components) component. _Refer to the Rich Display component for more details_

    2. The **Title** field, this is self explanatory at this stage and refers to the title that the media component can hold. In the Example above it is **"Business Strategy"**.

    3. The **Description** field, same as any description mentioned before, this is used to describe the content of the media component. In the Example above it is **"Financial Solutions"**.

    4. The **Url** field, this field is used when you want the media component to navigate you to an external resource or page upon clicking it. It is usefull in scenarios where linking the media component of a project to the actual project's website or resources is needed. Therefore upon clicking the image of a certain construction site project for example, you are navigated to the construction site's website or some article about it etc...

#### B) Front-End Examples:

1.  **Media Component as a plain Image**

    ![Screenshot (8)](https://user-images.githubusercontent.com/61231052/98395697-4ec12a80-2065-11eb-9f0a-0a6239316eee.png)

2.  **Media Component as a rich image (meaning having one or all of the 3 fields: title, description and url unomitted)**

    ![Screenshot (9)](https://user-images.githubusercontent.com/61231052/98396699-d22f4b80-2066-11eb-8172-dd57bb79c354.png)
    ![Screenshot (11)](https://user-images.githubusercontent.com/61231052/98396711-d5c2d280-2066-11eb-8d55-674662506dac.png)

3.  **Media Component as a Video**

    ![Screenshot (12)](https://user-images.githubusercontent.com/61231052/98396866-1b7f9b00-2067-11eb-8e36-173791ffd001.png)

4.  **Media Component as a Logo**

    ![Screenshot (1)](https://user-images.githubusercontent.com/61231052/98397246-bbd5bf80-2067-11eb-92af-4da7a1a371d6.png)

---

### 5) Map

    This component is formed of 2 fields:
     - longitude  (type: Decimal Number)
     - latitude   (type: Decimal Number)
     - zoom_level (type: Number)
     - scrollable (type: Boolean)
     - api_key    (type: Text)

### Description

This Component is used to insert a Google Map wherever needed. Both the latitude and longitude fields are used by the frontend developer to pinpoint and display
the desired location.

#### A) In The CMS:

1.  Filling the Map Component in Strapi:
    ![image](https://user-images.githubusercontent.com/61231052/103527051-7298c500-4e8a-11eb-98ab-38376ef5ae8b.png)

    #### Lets break it down

    1.  The **Latitude** field, this represents the latitude of the desired location to be displayed on the map.

    2.  The **Longitude** field, this represents the longitude of the desired location to be displayed on the map.

    3.  The **zoom_level** field, this field represents the level of zoom the map will have when displayed in the web page. By default this field has a value of 14 which
        you can check how it will look with such a zoom level in the Front End examples section that will follow.

    4.  The **scrollable** field, this boolean field is used to specify if you want the map to be fixed or can be scrolled. By default the scrollable field is **Off**

    5.  The **api_key** field, this text field is used to hold the Api Key of your google map after creation. For more info on how to acquire and build the map check https://developers.google.com/maps/documentation/embed/get-api-key

#### B) Front-End Examples:

1.  **Map Component Showing our Company's location with zoom_level 14 and scrollable to off**

    ![Screenshot (156)](https://user-images.githubusercontent.com/61231052/103531365-da064300-4e91-11eb-8096-4cddf615060b.png)

2.  **Other uses of the Map Component**

    ![image](https://user-images.githubusercontent.com/61231052/103531791-b7c0f500-4e92-11eb-980f-f2d3fa8eadde.png)

---

### 6) Feature-Card

    This component is formed of 5 fields:
     - image        (type: Media)
     - title        (type: Text)
     - description  (type: Text)
     - action       (type: Repeatable Component using Rich-Display)
     - background   (type: Media)
     - icon         (type: Media)
     - hover_effect (type: Boolean)

### Description

The Feature-Card Component is used to create cards in which the centre of focus is a feature.
Lets look into feature-card examples to better understand their structure.

#### A) In The CMS:

1.  Filling the Feature Component in Strapi:

    ![image](https://user-images.githubusercontent.com/61231052/103551117-8c4e0280-4eb2-11eb-8687-e6c987779e0e.png)

    #### Lets break it down

    1. **Title** field, this text field holds the title of the feature card.

    2. **Description** field, this text field holds the description of the feature card

    3. **Image** field, this field holds the image that represents the content of the feature card in a way. If this field is filled than the icon field should be left empty.
       ![Screenshot (161)](https://user-images.githubusercontent.com/61231052/103552063-f6b37280-4eb3-11eb-9d00-d83b269abb22.png)

    4. **action** field, this field is the [Rich Display](#components) component defined before in beginning of the components section. Here it is used as a repeatable component which means you can add multiple Rich Displays as needed.

    5. **background** field, this media field is used to upload an image to be the feature card's background.

    6. **icon** field, this text field has the same function as the image field above, so either you use Font Awesome icon names to fill this field or the image field

    7. **hover_effect** field, this boolean field is used to specify if the card has a hover effect or not. By default, a card has this field set to off. Check the upcoming
       Front-End examples in order to understand better.

```diff
-PS: The is overall three possible feature card types that are and can be created in the following ways:
  1) The first has the hover_effect as off and with no background.
  2) The Second has the hover_effect on and has a background. In this case it is mandatory to fill both fields or  else the component will not work properly
  3) The Third has no hover effect but has a background, therefore it is a feature card with a static background.
```

#### B) Front-End Examples:

1. **Feature Card Type1 discussed above with hover effect off and no background**

   ![Screenshot (16)](https://user-images.githubusercontent.com/61231052/98400178-46b8b900-206c-11eb-987a-1782739c6ed2.png)

2. **Feature Card of type2 discussed above with hover effect on and with a background**

   ![chrome-capture](https://user-images.githubusercontent.com/61231052/103633389-52cad500-4f4e-11eb-998c-50645a7b1129.gif)

3. **Feature Card of type3 discussed above with hover effect off and with a background**

   ![Screenshot (162)](https://user-images.githubusercontent.com/61231052/103634205-6b87ba80-4f4f-11eb-86a4-a9b580226f70.png)

---

### 7) Image-Card

    This component is formed of 4 fields:
     - image       (type: Media)
     - title       (type: Text)
     - description (type: Text)
     - action      (type: Repeatable Component using Rich-Display)

### Description

The **Image-Card** Component is used to create cards, in which the centre of focus is an image _(usually a profile)_.
As you might have noticed, the image-card is really similar to the **feature-card** if it weren't for the background and hover_effect field missing.
That is not a coincidence but an intended detail.
The reason of **seperating** the two components **Feature-Card** and **Image-Card** will become more apparent as we dive into the **examples**.
But to simply put it, both components have different purposes and merging them into a single component will make that component what we call
an **"overly dynamic"** component which is never a good thing.

#### A) In the CMS:

1.  **Filling the component in Strapi**

    ![Screenshot (163)](https://user-images.githubusercontent.com/61231052/103642488-dfc85b00-4f5b-11eb-934e-1986e15fc78d.png)

    #### Lets break it down

    1. **Title** field, this text field holds the title of the Image card. _(Usually it is the name of the person in question in case where the image card holds the profile of a person.)_

    2. **Description** field, this text field holds the description of the feature card. _(Usually it is the position of the person in question in the case where the image card holds the profile of a person.)_

    3. **Image** field, this field holds the image that represents the content of the Card. It is usually a Profile picture but it can also hold an image of
       a restaurant for example or anything that can be properly represented by an image.

    4. **action** field, this field is the [Rich Display](#components) component defined before in beginning of the components section. Here it is used as a repeatable component which means you can add multiple Rich Displays as needed. Usually with an Image-Card with a profile picture in its image field, we use Rich-Displays of type
       **social** to link the social media of the person in question.

#### B) Front-End Examples:

1. Image Card with a profile and **social** type Rich-Display.

   ![Screenshot (18)](https://user-images.githubusercontent.com/61231052/98405538-175a7a00-2075-11eb-9b83-bd64b581df12.png)

2. Image Card with no Rich Displays

   ![Screenshot (173)](https://user-images.githubusercontent.com/61231052/103758807-62641f80-501b-11eb-809b-3ed4f0e8e5e2.png)

---

### 8) Testimonial-Card

    This component is formed of 6 fields:
     - text    (type: Text)
     - author  (type: Text)
     - role    (type: Text)
     - action  (type: Repeatable Component using Rich-Display)
     - profile (type: Media)
     - rating  (type: Number min=0 and max=5)

### Descripition

The testimonial-card as its name implies, is used to display testimonies and/or quotes.

#### A) In the CMS:

1. **Filling the component in Strapi**

   ![image](https://user-images.githubusercontent.com/61231052/103649098-93cee380-4f66-11eb-937b-359257f61ed3.png)

#### Lets break it down

1.  **text** field, the text field is used to hold the testimony or quote to be dislayed. _(This field is not optional)_

2.  **author** field, this field is used to hold the name of the author of the testimony/quote. _(This field is not optional)_

3.  **role** field, this is used to hold the position or role of the author. _This field is optional_

4.  **action** field, this field is the [Rich Display](#components) component defined before in beginning of the components section. Here it is used as a repeatable component which means you can add multiple Rich Displays as needed. The action field is usually intended for social media links of the people to which the testimony belongs to. However, it can be used to display any navigational links asoociated with the testimony. _(This field os optional)_

5.  **profile** field, this media field is used to hold the profile of the author. _(This field os optional)_

6.  **rating** field, this field can be used if the Testimonial-Card represents for example a customer/client's review. _(This field os optional)_

#### Front-End Examples:

1.  **Testimonial-Card with all its fields unomitted**

    ![image](https://user-images.githubusercontent.com/61231052/103648604-d217d300-4f65-11eb-8059-3d0d6bfc4809.png)

2.  **Testimonial-Card with the rating field omitted**

    ![image](https://user-images.githubusercontent.com/61231052/103648806-1905c880-4f66-11eb-9eb0-686dfa37ed7d.png)

3.  **Testimonial-Card with the profile field omitted**

    ![image](https://user-images.githubusercontent.com/61231052/103648913-42beef80-4f66-11eb-9f3f-684512b50c96.png)

---

### 9) Statistic-Card

    This component is formed of 4 fields:
     - card_icon      (type: Text)
     - statistic      (type: Number)
     - statistic_icon (type: Text)
     - statistic_name (type: Text)

### Description

The Statistic-Card component is used to display a certain statistical number in the form of a card.

```diff
-The Component is used in the Statistic-Block as a repeatable component which we will discuss in the Sections part of the documentation.
```

#### A) In the CMS:

1. Filling the component in the CMS:

   ![image](https://user-images.githubusercontent.com/61231052/103760384-b3751300-501d-11eb-9a7b-d90d5912356d.png)

   #### Lets Break it Down

   1. **card_icon** field, this text field is used to specify the icon representing the statistic. This field is to be filled with the full **Font Awesome** icon name that is needed in order for the component to work properly (ex: fas fa-arrow-right).

      ![Screenshot (33)](https://user-images.githubusercontent.com/61231052/103766717-f9cf6f80-5027-11eb-9e04-8e0501a31290.png)

   2. **statistic** field, this field is used to hold the statistical number to be displayed

      ![Screenshot (177)](https://user-images.githubusercontent.com/61231052/103767178-d953e500-5028-11eb-9cb8-bd7f41520797.png)

   3. **statistic_icon** field, this text field holds the sign you want to put next to the number. For example it can be "+", "-", "%" etc.

      ![Screenshot (178)](https://user-images.githubusercontent.com/61231052/103767692-c2fa5900-5029-11eb-9b5e-268346ffd6ea.png)

      ```diff
         PS:This field is not filled using Font-Awesome icon names but should be filled directly as the text of the sign you want to add. So for example if you want a "+" sign near the statistic uou just fill the field with a "+"
      ```

   4. **statistic_name** field, this field is used to fill the text displayed under the statistic card referring to the name of the statistic _(ex: "Projects Completed")_

#### Front-End Examples:

1. Statistic-Card

   ![Screenshot (23)](https://user-images.githubusercontent.com/61231052/98512275-c0b89000-226e-11eb-92cc-ee72796c3f00.png)

---

### 10) Paragraph-Block

    This component is formed of 5 fields:
     - header         (type: Component using the Header-Description component)
     - text           (type: Text)
     - image          (type: Media)
     - image_position (type: Enumeration)
     - action         (type: Repeatable Component using Rich-Display)

### Description

The Paragraph-Block component is used whenever a paragraph is needed as a standalone component and not a sub-component.
The Pargraph-Block also comes with smart elements such as the Rich-Display and/or the Media component that makes it all the more customizable.

#### A) In the CMS:

1.  **Filling the component in Strapi**

    ![image](https://user-images.githubusercontent.com/61231052/103770977-977a6d00-502f-11eb-8a78-b3e5c338c944.png)

    #### Lets break it down:

    1.  **header** field, this field uses the Header Description component specified previously in the components section of this documentation.

    2.  **text** field, this text field holds the paragraph's text to be displayed

    3.  **action** field, this field is the [Rich Display](#components) component defined before in beginning of the components section. Here it is used as a repeatable component which means you can add multiple Rich Displays as needed.

    4.  **image** field, this media field is used to hold the image to be displayed if needed with the paragraph. The image can repesent anything or something relevant to the paragraph text.

    5.  **image_position** field, this enumeration field is used to specify the position of the image.

        ![image](https://user-images.githubusercontent.com/61231052/103772067-8fbbc800-5031-11eb-9aa2-e2ca4d27a404.png)

#### B) Front-End Examples:

1.  Paragraph-Block with a text field and an image in the bottom left and without a header component

    ![Screenshot (25)](https://user-images.githubusercontent.com/61231052/98514590-61f51580-2272-11eb-812f-22532ee4e435.png)

2.  Paragraph_Block with a header, text field,an action button and no image

    ![Screenshot (24)](https://user-images.githubusercontent.com/61231052/98514602-66b9c980-2272-11eb-917b-598c3176274f.png)

---

### 11) Text-Block

    This component is formed of 3 fields:
     - icon        (type: Text)
     - placeholder (type: Text)
     - fields      (type: Enumeration)

### Description

The Text-Block component is used to display any input field of a form or/and whenever a user input is needed.

#### A) In the CMS:

1.  Filling the Component in Strapi

    ![Screenshot (184)](https://user-images.githubusercontent.com/61231052/103790638-24322480-504a-11eb-864e-6ba00606a8cc.png)

    #### Lets Break It Down

    1. The **icon** field, this text field holds the icon representing the content of the Text-Block. In the filled entry example seen above, you can notice that we are using F **Font Awesome** for our icons therefore filling in the full **Font Awesome** icon name in the field does the job.

       ![Screenshot (186)](https://user-images.githubusercontent.com/61231052/103792043-d9191100-504b-11eb-9e89-ea14fc67aba3.png)

    2. The **placeholder** field, this text field specifies the placeholder of the Text-Block, for example it could be "Name Here", "Email", "Enter your Last Name" etc...

       ![Screenshot (187)](https://user-images.githubusercontent.com/61231052/103793110-9b68b800-504c-11eb-9612-ff142b71a8af.png)

    3. The **fields** field, this enumeration field holds all possible types of Text-Block that can be used. The type specifies the type of content that will be inputted in the text block.

       ![Screenshot (185)](https://user-images.githubusercontent.com/61231052/103791410-18932d80-504b-11eb-9884-2e5b73b78b02.png)

#### B) Front-End Examples:

1. Multiple Text-Blocks used in a form for different purposes

   ![Screenshot (26)](https://user-images.githubusercontent.com/61231052/98517604-d6ca4e80-2276-11eb-92ba-9517946fa1f5.png)

2. Text-Block with fields field set to email

   ![Screenshot (27)](https://user-images.githubusercontent.com/61231052/98517816-2e68ba00-2277-11eb-9871-9d2ddb41c712.png)

3. Text-Block with the fields field set to textarea

   ![Screenshot (188)](https://user-images.githubusercontent.com/61231052/103793985-da970900-504c-11eb-83c9-02a9b5da57b2.png)

4. Text-Block with the fields field set to text

   ![image](https://user-images.githubusercontent.com/61231052/103794436-63ae4000-504d-11eb-85ee-0f8acf48c57f.png)

---

### 12) dropdown

    This component is formed of 4 fields:
     - url   (type: Text)
     - label (type: Text)
     - items (type: One to Many relationship with Dropdown-Section Collection Type)
     - page  (type: One to One relation with Page Collection Type)

### Description

The Dropdown component is in a way an alternative version of the Rich-Display component that support dropdown.The Dropdown component can contain multiple dropdown
sections represented by the one to many relation (named items).
Also, in the case where the dropdown redirects you to an internal page of the website, that page can be specified in the page field, which is a one to one relation
with the Page Collection type.

#### A) In the CMS:

1.  **Filling the component in Strapi**

    ![Screenshot (191)](https://user-images.githubusercontent.com/61231052/103875328-f6e18700-50da-11eb-8288-0c08e6d220a7.png)

    #### Lets Break it down

    1.  **label** field, this text field specifies the text that the dropdown component will hold.

    2.  **page** field. In the case where the dropdown redirects you to an internal page of the website, that page can be specified in the page field, which is a one to one relation with the Page [Collection Type](#collection-types).

    3.  **items** field. The Dropdown component can contain multiple dropdown sections represented by the one to many relation field with the DropDown-Section [Collection Type](#collection-types).

#### B) Front-End Examples:

1.  Nested Dropdown Component containing 3 dropdown sections Nested1, Nested2 and Nested3 seen the in Strapi screenshot above.

    ![image](https://user-images.githubusercontent.com/61231052/103876155-fbf30600-50db-11eb-8640-ccabc6f94f21.png)

2.  Home Button Dropdown component containing 2 dropdown sections Home1 and Home2

    ![Screenshot (29)](https://user-images.githubusercontent.com/61231052/98524019-52c89480-227f-11eb-8664-e84e59e4c8c6.png)

---

### 13) Color

    This component is formed of 2 fields:
     - value (type: Text)
     - name  (type: Text)

### Description

This Component is a simple component, solely used to store colors using a color name and value. Colors are then added manually to the Theme Single type,
defining the themes that the Front-End developer is expected to follow.

#### A) In the CMS:

1.  Filling the component in Strapi

    ![Screenshot (194)](https://user-images.githubusercontent.com/61231052/103876680-a10dde80-50dc-11eb-9ab2-1661eeaf3699.png)

    #### Lets Break it Down

    1. **value** field, this text field holds the Hexadecimal (#RRGGBB) value of the color. _(This field is not optional and is required with a default value of #ffffff)_

    2. **name** field, this text field holds the color name to be associated with the value.

#### B) Front-End Examples

1. **color_primary with value #2600b5 and name blue-1 of the previous example used in the Front-End on the Home Dropdown Component**

   ![image](https://user-images.githubusercontent.com/61231052/103877455-c9e2a380-50dd-11eb-9038-7957aaa4c8d7.png)

---

## Sections

[Back to the Documentation](#documentation)

[Back to the Table of Content](#table-of-contents)

### 1) Feature-Block

    This Section is formed of 2 fields:
     - header     (type: Component using the Header-Description component)
     - content    (type: Repeatable Component using the Feature-Card component)
     - background (type: Media)

### Description

The Feature-Block is a section that contains usually one or multiple Feature-Card components to be displayed. Like all sections of our cms the section starts with a header component that uses the already existing Header-Description Component.

### A) Section Breakdwon in Strapi:

![Screenshot (197)](https://user-images.githubusercontent.com/61231052/103878871-b7696980-50df-11eb-8056-c651c40bb477.png)

#### Lets Break it down

1.  **header** field. Like all sections of our cms the section starts with a header component that uses the already existing Header-Description Component defined in the [Components](#components) section of our documentation.

2.  **content** field. Here all the feature cards to be displayed inside our Feature-Block are added and filled in the same way described earlier in the documentation.

3.  **background**field. A simple media field that holds the background of the entire Feature Block

#### B) Front-End Example:

1. A Feature-Block

   ![Screenshot (31)](https://user-images.githubusercontent.com/61231052/98526988-1c8d1400-2283-11eb-9cb6-903c30e38dd4.png)

---

### 2) Image-Block

     This Section is formed of 3 fields:
     - header    (type: Component using the Header-Description component)
     - cards     (type: Repeatable Component using the Image-Card component)
     - paragraph (type: Component using paragraph-block component)

### Description

The Image-Block is a section containing one or multiple Image-Cards to be displayed. It also offers the ability to have a Paragraph-Block component in it.

#### A) Section Breakdown in Strapi:

![Screenshot (200)](https://user-images.githubusercontent.com/61231052/103881044-96eede80-50e2-11eb-821c-c2b4e583e7c9.png)

#### Lets Break it Down

1.  **header** field. Like all sections of our cms the section starts with a header component that uses the already existing Header-Description Component defined in the [Components](#components) section of our documentation.

2.  **card** field. Here all the Image-Cards to be displayed inside our Image-Block are added and filled as documented in [Components](#components) section of our documentation.

3.  **paragraph** field. This is a component using the Paragraph block and is filled as documented earlier in the [Components](#components) section of our documentation.

#### B) Front-End Examples:

1. An Image-Block

   ![Screenshot (32)](https://user-images.githubusercontent.com/61231052/98528462-fe281800-2284-11eb-8a57-ae63322340f7.png)

---

### 3) Statistic-Block

    This Section is formed of 2 fields:
     - header     (type: Component using the Header-Description component)
     - content    (type: Repeatable component using the Statistic-Card component)
     - background (type: Media)

### Description

The Statistic-Block contains and is used to display one or multiple Statistic-Cards.

#### A) Section Breakdown in Strapi:

```diff
-PS: The Section breakdown is identical to the Feature-Block Section earlier with a single change that the content field holds statistic cards instead Feature-Cards.
```

#### A) Front-End Example:

1.  A Statistic-Block

    ![Screenshot (33)](https://user-images.githubusercontent.com/61231052/98529041-cf5e7180-2285-11eb-9b64-231ff998fcb7.png)

---

### 4) Gallery-Block

    This Section is formed of 2 fields:
     - header       (type: Component using the Header-Description component)
     - gallery_item (type: Repeatable component using the Media component)

### Description

The Gallery-Block is used to create a Gallery of Media Components (using the Media Component) such as images AND/OR videos.
Some examples may include but are not limited to: Projects Photos, Art pieces in an Art galley website, a photgrapher's gallery etc...

#### A) Section Breakdown in Strapi:

```diff
-PS: The Section breakdown is identical to the Feature-Block Section earlier with minor changes.
- 1) The content field is named gallery_item and holds media components instead Feature-Cards.
- 2) Also this section has no background.
```

#### Front-End Examples:

1.  A Gallery-Block

    ![Screenshot (35)](https://user-images.githubusercontent.com/61231052/98530750-03d32d00-2288-11eb-8f57-792955ac7e71.png)

---

### 5) Grid-Block

    This Section is formed of 3 fields:
     - title      (type: Text); serves as a title for the Block Being Created
     - components (type: One to Many relation with the Grid Component Collection Type)
     - background (type: Media); serves as the background image of the block

### Description

The Grid-Block Section offers a way to create dynamic sections containing multiple grid components. Each Grid component fills a number of columns between 1 and 12 using
the convention of a 12 columns grid system _(12 being the entire width of the screen)_.

#### A) Section Breakdown in Strapi:

1.  Filling the Component in Strapi:

    ![Screenshot (201)](https://user-images.githubusercontent.com/61231052/103889399-0a96e880-50ef-11eb-9891-2a547c5822fc.png)

    #### Lets Break It Down

    1. **title** field, this text field serves as the title of the Block Being Created.

    2. **components** fields, this one to many relation field is used the Components forming our Grid Block created using the grid component single type which is discussed in the [Collection Types](#collection-types) part of the documentation.

    3. **background** field, this media field is used when a background for the Grid-Block is needed.

#### B) Front-End Examples:

1.  Grid-Block with a two 6 column Grid Component _( check section number 9 below)_.

    ![Screenshot (36)](https://user-images.githubusercontent.com/61231052/98536860-20c02e00-2291-11eb-9fa8-c307abd2c1fb.png)

2.  Grid Block with three 4 column Grid Components _( check section number 9 below)_ :

    ![Screenshot (39)](https://user-images.githubusercontent.com/61231052/98538011-cfb13980-2292-11eb-895e-4ac37ce88f65.png)

---

### 6) Form-Block

    This Section is formed of 3 fields:
     - header     (type: Component using the Header-Description component)
     - text_block (type: Component using the TextBlock component)
     - actions    (type: Component using the Rich-Display component)

### Description

The Form section is used to Display a Form. A Header Description using the HeaderDescription component can be specified if needed.

#### A) Section Breakdown in Strapi:

![Screenshot (234)](https://user-images.githubusercontent.com/61231052/105037849-4626a080-5a67-11eb-98a4-ce2eb8c3feb6.png)

#### Lets Break it Down:

1.  **header** field. Like all sections of our cms, this section starts with a header component that uses the already existing Header-Description Component defined in the [Components](#components) section of our documentation.

2.  **text_block** field, this field is a reapeatable component that uses the TextBlock Component. You can learn more about the TextBlock component in the previous [Components](#components) section of our documentation.

3.  **actions** field, this field is a reapeatable component that uses the Rich-Display component. In the Form-Block Component, there should be a Rich-Display of type **Submit**.

#### B) Front-End Examples:

1. A Form-Block

   ![Screenshot (235)](https://user-images.githubusercontent.com/61231052/105038954-a407b800-5a68-11eb-8d61-0e9e6a6966cb.png)

---

### 7) Hero-Banner

    This Section is formed of 3 fields:
     - media     (type: Media)
     - content   (type: Component using the Header-Description component)
     - action    (type: Repeatable Component using the Rich-Display component)
     - video_url (type: Text)

### Description

Hero Banner usually means that it's a large, bold, in-your-face image. There is one thing that is very important to note.
A hero banner or hero image should reflect the goals of the website.

#### A) Section Breakdown in Strapi:

![Screenshot (203)](https://user-images.githubusercontent.com/61231052/103892483-55ffc580-50f4-11eb-8656-e202bdc44118.png)

#### Lets Break it Down:

1.  **media** field. This field holds the hero banner image to be displayed.

2.  **content** field, this component uses the already existing Header-Description Component defined in the [Components](#components) section of our documentation. The title and description fields of the Header-Description component usually holds respectively when used in the Hero-Banner section the full name and motto of the company.

3.  **action** field, this field is the [Rich Display](#components) component defined before in beginning of the components section. Here it is used as a repeatable component which means you can add multiple Rich Displays as needed.

4.  **video_url** field. In the case where the media fields holds a video, this fields holds the url of that video to be displayed.

#### B) Front-End Examples:

1. A Hero-Banner

   ![Screenshot (41)](https://user-images.githubusercontent.com/61231052/98540028-f1f88680-2295-11eb-8d03-08113fa108e5.png)

---

### 9) Repeatable-Hero-Banner

    This Section is formed of 1 field:
     - hero_banner (type: Repeatable Component using the Hero-Banner defined in section number 8)

### Description

A Repeatable-Hero-Banner allows the existence of multiple Hero-Banners that are scrollable.

#### A) Section Breakdown in Strapi:

![image](https://user-images.githubusercontent.com/61231052/103893561-2782ea00-50f6-11eb-8d90-60e8b6a71471.png)

#### Lets Break It Down:

1.  **hero_banner** field. This component field allows to add multiple filled Hero-Banners forming a single scrollable Hero-Banner.

#### B) Front-End Example:

1.  A Repeatable-Hero-Banner

    ![repeatable-hero](https://user-images.githubusercontent.com/61231052/103894119-1edee380-50f7-11eb-994b-c4fbd3fb9349.gif)

---

### 10) Carousel

    This Section is formed of 3 fields:
     - header        (type: Component using the Header-Description component)
     - background    (type: Media)
     - carousel_item (type: Repeatable Component using the Media component)

### Description

The carousel section is used to display multiples scrollable carousel items.

#### A) Section Breakdown in Strapi:

![Screenshot (207)](https://user-images.githubusercontent.com/61231052/103901202-7f731e00-5101-11eb-8055-76de15638e6c.png)

#### Lets Break It Down:

1.  **header** field. Like all sections of our cms, this section starts with a header component that uses the already existing Header-Description Component defined in the [Components](#components) section of our documentation.

2.  **background** field, this media field is used when a background for the Carousel is needed.

3.  **carousel_item** field, this repeatable component uses the Media Component defined in the [Components](#components) section of our documentation. These media components form the scrollable items of our Carousel.

#### B) Front-End Examples:

1.  A Carousel

    ![Screenshot (42)](https://user-images.githubusercontent.com/61231052/98541034-7ac3f200-2297-11eb-9a52-22e05dbb9982.png)

---

### 11) Testimonial-Carousel

    This Section is formed of 2 fields:
     - header    (type: Component using the Header-Description component)
     - testimony (type: Repeatable component using Testimonial-Card component)

### Description

The Testimonial-Carousel is a special type of carousel solely used to display scrollable Testimonial Cards.

#### A) Section Breakdown in Strapi:

![Screenshot (208)](https://user-images.githubusercontent.com/61231052/103902928-e1348780-5103-11eb-9d51-9a6453cf1899.png)

#### Lets Break it Down:

1. **header** field. Like all sections of our cms, this section starts with a header component that uses the already existing Header-Description Component defined in the [Components](#components) section of our documentation.

2. **testimony** field. This fied is Repeatable Compoenent that uses the Testimony-Card component defined in the [Components](#components) section of our documentation.

#### B) Front-End Examples:

1. A Testimonial-Carousel

   ![Screenshot (43)](https://user-images.githubusercontent.com/61231052/98542134-215cc280-2299-11eb-8f17-086cc954419c.png)

---

### 12) Map-Block

    This Section is formed of 2 fields:
     - header         (type: Component using the Header-Description component)
     - map            (type: Component using Map component)
     - location_cards (type: Repeatable component using the Feature-Card component)

### Description

The Map Block holds a Map component and can contain multiple location cards.

#### A) Section Breakdown in Strapi:

![image](https://user-images.githubusercontent.com/61231052/105040118-22b12500-5a6a-11eb-8f96-3c788728aa3a.png)

#### Lets Break it Down:

1. **header** field. Like all sections of our cms, this section starts with a header component that uses the already existing Header-Description Component defined in the [Components](#components) section of our documentation.

2. **map** field. This field uses the Map component defined in the [Components](#components) section of our documentation.

3. **location_cards** field. This field is a Repeatable Component that uses the feature-card component. Location cards are used to display location related information in the form of a card. Here you need to leave the **hover_effect** field of the feature-card as is without changing its default value to 'Yes'.

#### B) Front-End Examples:

1. A Map-Block

   ![Screenshot (240)](https://user-images.githubusercontent.com/61231052/105040826-fd70e680-5a6a-11eb-8d9d-a47f67be9bd3.png)

## Collection Types

[Back to the Documentation](#documentation)

[Back to the Table of Content](#table-of-contents)

### 1) Grid Component

    This collection type contains 3 fields:
     - colSpace (type: Integer Number with a minimum allowed value of 1 and a maximum allowed value of 12)
     - content  (type: Dynamic Zone)
     - tag      (type: Text); used to specify a name for the Grid Component that the front end can use  to identify the component in hand.

### Description

Using this collection type we can add already existing components to the content Dynamic Zone, tag them with an identifier, and then specify how many columns
they would occupy in the Grid-Block. This Grid Component/Grid-Block relation offers a great oppurtunity to create personlized sections with the grid components of choice.

#### A) Section Breakdown in Strapi:

1.  Adding a new Grid Component:

    1. After pressing on the Grid Components Collection Type in the Left Menu of Strapi, you are directed to a display of all the already created Grid Components. To Create a new Grid Component click on the "Add New Grid Component" button located in the top right corner of the screen.

       ![Screenshot (209)](https://user-images.githubusercontent.com/61231052/104004867-f4e7f880-51ac-11eb-82f6-57cea41a8b61.png)

    2. Next, you are directed to the "Create An Entry" screen you can see below.

       ![Screenshot (211)](https://user-images.githubusercontent.com/61231052/104005091-46908300-51ad-11eb-9399-ef6022a85860.png)

       #### Lets Break It Down

       1. The **colSpace** field specifies how many columns will the Grid Component occupy out of the 12 columns that form the full width of the screen.

       2. The **content** Dynamic Zone contains all the already existing components that we defined in the first part of our documentation. The component chosen will occupy the number of column specified in the colSpace field and form a Grid Component.

       3. The **tag** field is just a simple text field used to tag the grid component with a meaningful naming, making it easier for the front end developer to distinguish the Grid Components from each other.

#### B) Front-End Examples:

1.  From Left to Right: 4 column Grid Component using the Paragraph-Block, 4 column Grid Component using the Media Component, 4 column Grid Component also using a Paragraph-Block

    ![Screenshot (39)](https://user-images.githubusercontent.com/61231052/98546116-2290ee00-229f-11eb-8a64-3b32109f527f.png)

2.  From Left to Right: 6 column Grid Component using the Testimonial-Carousel, 6 column Grid Component using the Media Component

    ![Screenshot (36)](https://user-images.githubusercontent.com/61231052/98546995-338e2f00-22a0-11eb-81ad-1169080589ee.png)

---

### 2) Page

    This collection type contains 3 fields:
     - name       (type: Text); name of the page e.g "Contact Us"
     - sections   (type: Dynamic Zone); the body of the page
     - link       (type: Text); this link is a relative path of the page e.g "/aboutus"
     - background (type: Media)

### Description

Each entry in this collection type is a page in the website.
In the sections Dynamic Zone, you pick from all the already created components and sections the ones you want in your created Page Entry.

#### A) Section Breakdown in Strapi:

1.  Adding a new Page:

    1.  After pressing on Pages Collection Type in the Left Menu of Strapi, you are directed to a display of all the already added Pages. To Create a new Page click on the "Add New Page" button located in the top right corner of the screen.

        ![Screenshot (212)](https://user-images.githubusercontent.com/61231052/104016069-392fc480-51be-11eb-8b85-f0989b8a8544.png)

    2.  Next, you are directed to the "Create An Entry" screen you can see below.

        ![Screenshot (213)](https://user-images.githubusercontent.com/61231052/104007103-1696af00-51b0-11eb-94a4-3a9551b406c3.png)

        #### Lets Break it Down

        1.  **name** text field is used to specify the name of the Page being created for example: "Homepage", "Contact", "About".

        2.  **sections** Dynamic Zone contains all the already existing sections and components that we defined in the first two parts of our documentation ([Components](#components), [Sections](#sections) ). Using the Dynamic Zone, the user can add and create his desired sections one by one.

        3.  **link** text field is used to specify the relative path of the page, this is fairly useful for the front end developer for navigational purposes and for Next.js. Example input: "/contact", "/homepage", "/about".

        4.  **background** media field. This field is used to specify if the page will have the Simple Banner component at the Start of the Page or not. If this field is not empty this means that the media added will be displayed as a simple banner at the start of the page containing the page's name as a Title. If the field is left empty means a Simple Banner at the start of the page is not needed. Lets Check some examples to understand it better.

            1.  A Page with a non-empty background field:

                ![Screenshot (216)](https://user-images.githubusercontent.com/61231052/104009261-6fb41200-51b3-11eb-805a-cdaa354e3b47.png)

            2.  A Page with an Empty background field:

                ![Screenshot (217)](https://user-images.githubusercontent.com/61231052/104009277-7478c600-51b3-11eb-8bd0-1f655912f2d0.png)

```diff
-PS: If you intend to add a Hero-Banner or a Repeatable-Hero-Banner at the start of your page then leave the background field empty, otherwise it can generate problems. Also,  the existence of both a Hero-Banner/Repeatable-Hero-Banner and a Simple Banner at the start of a page is not logical since from a design point of view a page has a single banner and not multiple banners.
```

---

### 3) Dropdown Section

    This collection type contains 3 fields:
     - text  (type: Text)
     - url   (type: Text); the desired url to be navigated to when the component is clicked

### Description

This collection type holds the dropdown sections of a dropdown component (defined earlier in the [Components](#components) section of our documentation).

#### A) Section Breakdown in Strapi:

1.  Adding a new Page:

    1.  After pressing on Pages Collection Type in the Left Menu of Strapi, you are directed to a display of all the already added Pages. To Create a new Page click on the "Add New Page" button located in the top right corner of the screen.

        ![Screenshot (218)](https://user-images.githubusercontent.com/61231052/104015939-0b4a8000-51be-11eb-9223-8bcb8de5eeef.png)

    2.  Next, you are directed to the "Create An Entry" screen you can see below.

        ![Screenshot (213)](https://user-images.githubusercontent.com/61231052/104007103-1696af00-51b0-11eb-94a4-3a9551b406c3.png)

        #### Lets Break it Down

        1.  **text** field is used to specify the name of the dropdown section.

        2.  **url** text field is used to specify the url of the destination to which the dropdown section will navigate to on click.

#### B) Front-End Examples:

1.  Here Nested 1 and Nested 2 adn Nested 3 are dropdown sections of the Dropdown component Nested

    ![image](https://user-images.githubusercontent.com/61231052/104018585-b0675780-51c2-11eb-9ea5-4b66e2b6f57f.png)

---

## Single Types

[Back to the Documentation](#documentation)

[Back to the Table of Content](#table-of-contents)

### 1) Header

    This single type is made up of 2 Dynamic Zones:
      - leftContent
      - rightContent

### Description

The Header single type usually represents the navigation menu of your website situated at the head of the page. The Single Type is formed of two Dynamic Zones 'leftContent'
and 'rightContent'. These Dynamic Zones offers the freedom to design the header or the menu the way the client desires, making use of the multiple reusable [components](#components) available.

#### A) Section Breakdown in Strapi:

1.  Before Adding to the Dynamic Zones

    ![Screenshot (225)](https://user-images.githubusercontent.com/61231052/104019517-5bc4dc00-51c4-11eb-94b3-a493cc899cd1.png)

2.  Adding to the Dynamic Zones

    ![Screenshot (226)](https://user-images.githubusercontent.com/61231052/104019518-5e273600-51c4-11eb-9a35-88fd8f05e375.png)

#### B) Front-End Examples:

1.  A Header Single Type

    ![Screenshot (45)](https://user-images.githubusercontent.com/61231052/98556259-84575500-22ab-11eb-8aeb-a90d04c9c7e7.png)

---

### 2) Info Banner

    This single type is made up of 2 Dynamic Zones:
      - leftContent
      - rightContent

The Info Banner Single Type like the Header single type consists of two Dynamic Zones with the same naming and same added components. This Single type is used to display certain information in the form a small banner that can be situated anywhere on the page.

```diff
-PS: This Single type looks and is filled the same way in Strapi as the Header Single type. So for more information check the Header Single Type detailed breakdown above.
```

#### B) Front-End Examples:

1.  An Info Banner

    ![Screenshot (41)](https://user-images.githubusercontent.com/61231052/98558026-9fc35f80-22ad-11eb-9307-97cd7a0983f3.png)

---

### 3) Footer

    This single type is made up of 3 Dynamic Zones:
      - leftContent
      - rightContent
      - topContent

The Footer Single Type unlike the Header and Info Banner Single Types consists of 3 dynamic zones named respectively ‘topContent' ‘rightContent’ and 'leftContent’.
This Single type forms the footer of the website, the footer is consistent in both its position(at the bottom of the page) and its content(how it looks) throughout
the pages of the website.

#### A) Section Breakdown in Strapi:

1. Before Adding to the Dynamic Zones

   ![Screenshot (227)](https://user-images.githubusercontent.com/61231052/104020463-f114a000-51c5-11eb-874d-704dcaaa11df.png)

2. Adding to the Dynamic Zones

   ![Screenshot (228)](https://user-images.githubusercontent.com/61231052/104020480-f96cdb00-51c5-11eb-8328-79fd916e44cd.png)

#### B) Front-End Examples:

1. A Footer single type with all 3 dynamic zones.

   ![Screenshot (46)](https://user-images.githubusercontent.com/61231052/98557112-77873100-22ac-11eb-8b93-b61e01932bca.png)

2. A Footer single type with only the leftContent dynamic zone.

   ![Screenshot (48)](https://user-images.githubusercontent.com/61231052/98557488-f2504c00-22ac-11eb-9e7e-66c0712461af.png)

---

### 4) Theme

### Description

This Single Type varies from project to project and is usually filled with multiple color components each one having its own name and value. These Color components
form the theme of the website. Also text fields can be added specifying the fonts of the website.

#### Example:

**The TF961 theme single type includes at the moment the following Color Components**
![Screenshot (50)](https://user-images.githubusercontent.com/61231052/98559085-da79c780-22ae-11eb-8571-0096fad58c4e.png)

---
