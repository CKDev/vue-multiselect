<template>
  <div id="app">

    <div class="wrapper">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vitae mattis augue. Aenean eget quam vel ante fringilla hendrerit. Integer id magna nec ex sodales gravida vitae id mi. Cras efficitur posuere ante, id mollis ligula dignissim a. Suspendisse volutpat laoreet felis. Ut eu elementum urna. Suspendisse molestie purus non viverra rhoncus. Praesent et enim et tellus convallis fringilla. Aliquam leo metus, commodo nec lectus vel, ultricies venenatis mauris. Cras luctus facilisis ante at eleifend. Cras ante felis, dictum eu magna sed, viverra malesuada mauris. Nullam a magna dignissim, euismod sapien sed, dictum sem. Etiam fringilla ipsum at volutpat euismod.</p>
      <p>In lorem lacus, venenatis a nisi id, mollis hendrerit elit. Duis at diam eget mauris semper semper. Integer vel varius neque, non rhoncus dolor. Suspendisse sagittis scelerisque ante. Maecenas dapibus elit quis dui pharetra, vitae lobortis odio volutpat. Maecenas in nulla quam. Ut non convallis odio, vitae bibendum diam. In pharetra felis vel lobortis ultricies. Cras pulvinar elit ante, in rutrum enim rutrum luctus. Pellentesque sed purus venenatis, euismod nibh vitae, maximus enim. Donec hendrerit tristique augue, et mollis lacus condimentum id. Aliquam erat volutpat. Donec at aliquam nisi, sit amet ultricies nisl. Integer sit amet consectetur ipsum.</p>
      <p>Aliquam consequat erat ut mauris posuere malesuada. Curabitur ac ipsum dictum, facilisis neque vel, aliquam nisl. Mauris pulvinar ex elit, auctor varius erat auctor at. Nulla iaculis gravida metus ut blandit. Sed pulvinar mauris iaculis est viverra ultricies. Integer eget fringilla libero. Donec ut pretium nunc. Suspendisse at turpis mi. Mauris et erat vehicula, rhoncus ante eget, viverra velit. Integer at imperdiet urna.</p>
      
      <div class="example">
        <h1>Base Example (no custom css, js, or markup)</h1>

        <div class="container">
          <p class="current"><strong>Current Value:</strong> {{selected_custom}}</p>
          <label class="input-label">Choose One</label>
          <v-multiselect :options="options" :allow-suggest="true" placeholder="Search for a Cocktail" v-model="selected_custom"></v-multiselect>
        </div>

        <div class="container">
          <p class="current"><strong>Current Value:</strong> {{selected_native}}</p>
          <label class="input-label">Choose One</label>
          <select multiple="multiple" v-model="selected_native">
            <optgroup label="Rum">
              <option value="Blue Hawaii">Blue Hawaii</option>
              <option value="Brass Monkey">Brass Monkey</option>
              <option value="Bumbo">Bumbo</option>
              <option value="Bushwacker">Bushwacker</option>
              <option value="Caribou Lou">Caribou Lou</option>
              <option value="Cojito">Cojito</option>
              <option value="Cremat">Cremat</option>
              <option value="Cuba Libre">Cuba Libre</option>
              <option value="Cuban Sunset">Cuban Sunset</option>
              <option value="Daiquiri">Daiquiri</option>
              <option value="Dark 'N' Stormy">Dark 'N' Stormy</option>
              <option value="El Presidente">El Presidente</option>
              <option value="Fish House Punch">Fish House Punch</option>
              <option value="Flaming Dr Pepper">Flaming Dr Pepper</option>
              <option value="Flaming Volcano">Flaming Volcano</option>
              <option value="Fluffy Critter">Fluffy Critter</option>
              <option value="Grog">Grog</option>
              <option value="Gunfire">Gunfire</option>
              <option value="Hot buttered rum">Hot buttered rum</option>
              <option value="Hurricane">Hurricane</option>
              <option value="Jagertee">Jagertee</option>
              <option value="Long Island Iced Tea">Long Island Iced Tea</option>
              <option value="Macuá">Macuá</option>
              <option value="Mai-Tai">Mai-Tai</option>
              <option value="Mojito">Mojito</option>
              <option value="Painkiller">Painkiller</option>
              <option value="Piña Colada">Piña Colada</option>
              <option value="Planter's Punch">Planter's Punch</option>
              <option value="Royal Bermuda Cocktail">Royal Bermuda Cocktail</option>
              <option value="Rum Swizzle">Rum Swizzle</option>
              <option value="Ti' Punch">Ti' Punch</option>
              <option value="Tom and Jerry">Tom and Jerry</option>
              <option value="Tschunk">Tschunk</option>
              <option value="Yellow Bird">Yellow Bird</option>
              <option value="Zombie">Zombie</option>
            </optgroup>
            <optgroup label="Tequila"><option value="Bloody Aztec">Bloody Aztec</option>
              <option value="Chimayó Cocktail">Chimayó Cocktail</option>
              <option value="El Toro Loco Patron and Redbull">El Toro Loco Patron and Redbull</option>
            </optgroup>
            <optgroup label="My Group"><option value="Juan Collins">Juan Collins</option>
              <option value="Long Island Iced Tea">Long Island Iced Tea</option>
              <option value="Margarita">Margarita</option>
              <option value="Matador">Matador</option>
              <option value="Paloma">Paloma</option>
              <option value="Slammer Royale">Slammer Royale</option>
              <option value="Tequila Sunrise">Tequila Sunrise</option>
              <option value="Vampiro">Vampiro</option>
            </optgroup>
            <optgroup label="Vodka"><option value="Agent Orange">Agent Orange</option>
              <option value="Apple Martini">Apple Martini</option>
              <option value="Astro pop">Astro pop</option>
              <option value="Batida">Batida</option>
              <option value="Bay Breeze">Bay Breeze</option>
              <option value="Blue Lagoon">Blue Lagoon</option>
              <option value="Bull Shot">Bull Shot</option>
              <option value="Caesar">Caesar</option>
              <option value="Caipivodka">Caipivodka</option>
              <option value="Cape Cod">Cape Cod</option>
              <option value="Chi-Chi">Chi-Chi</option>
              <option value="Colombia">Colombia</option>
              <option value="Fizzy apple cocktail">Fizzy apple cocktail</option>
              <option value="Flirtini">Flirtini</option>
              <option value="Gimlet">Gimlet</option>
              <option value="Glowtini">Glowtini</option>
              <option value="Harrogate Nights">Harrogate Nights</option>
              <option value="Hi-fi">Hi-fi</option>
              <option value="Kensington Court Special">Kensington Court Special</option>
              <option value="Kremlin Colonel">Kremlin Colonel</option>
              <option value="Lemon Drop">Lemon Drop</option>
              <option value="Lime Rickey">Lime Rickey</option>
              <option value="Link Up">Link Up</option>
              <option value="Mudslide">Mudslide</option>
              <option value="Orange Tundra">Orange Tundra</option>
              <option value="Paralyzer">Paralyzer</option>
              <option value="Red Lotus">Red Lotus</option>
              <option value="Red Russian">Red Russian</option>
              <option value="Rose Kennedy Cocktail">Rose Kennedy Cocktail</option>
              <option value="Salmiakki Koskenkorva">Salmiakki Koskenkorva</option>
              <option value="Salty Dog">Salty Dog</option>
              <option value="Vodka Gimlet">Vodka Gimlet</option>
              <option value="Vodka Martini">Vodka Martini</option>
              <option value="Vodka McGovern">Vodka McGovern</option>
              <option value="Vodka Sunrise">Vodka Sunrise</option>
              <option value="White Russian">White Russian</option>
            </optgroup>
            <optgroup label="Whisky"><option value="Amber Moon">Amber Moon</option>
              <option value="Blue Blazer">Blue Blazer</option>
              <option value="Black Nail">Black Nail</option>
              <option value="Bobby Burns">Bobby Burns</option>
              <option value="Boulevardier">Boulevardier</option>
              <option value="Bourbon Lancer">Bourbon Lancer</option>
              <option value="Brooklyn">Brooklyn</option>
              <option value="Churchill">Churchill</option>
              <option value="Farnell">Farnell</option>
              <option value="Horsefeather">Horsefeather</option>
              <option value="Jack and Coke">Jack and Coke</option>
              <option value="Jungle Juice">Jungle Juice</option>
              <option value="Lynchburg Lemonade">Lynchburg Lemonade</option>
              <option value="Missouri Mule">Missouri Mule</option>
              <option value="Nixon">Nixon</option>
              <option value="Rob Roy">Rob Roy</option>
              <option value="Scotch and Soda">Scotch and Soda</option>
              <option value="Seven and Seven">Seven and Seven</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div class="example">
        <h1>Example with custom suggestion option</h1>

        <div class="container">
          <p class="current"><strong>Current Value:</strong> {{selected_custom_option}}</p>
          <label class="input-label">Choose One</label>
          <v-multiselect :options="options" :allow-suggest="true" placeholder="Search for a Cocktail" v-model="selected_custom_option">
            <div slot="suggestion" slot-scope="{ suggestion }" style="padding: 2rem;">Add {{suggestion.label}} (cause it's better)</div>
          </v-multiselect>
        </div>

        <div class="container">
          <p class="current"><strong>Current Value:</strong> {{selected_native_option}}</p>
          <label class="input-label">Choose One</label>
          <select multiple="multiple" v-model="selected_native_option">
            <optgroup label="Rum">
              <option value="Blue Hawaii">Blue Hawaii</option>
              <option value="Brass Monkey">Brass Monkey</option>
              <option value="Bumbo">Bumbo</option>
              <option value="Bushwacker">Bushwacker</option>
              <option value="Caribou Lou">Caribou Lou</option>
              <option value="Cojito">Cojito</option>
              <option value="Cremat">Cremat</option>
              <option value="Cuba Libre">Cuba Libre</option>
              <option value="Cuban Sunset">Cuban Sunset</option>
              <option value="Daiquiri">Daiquiri</option>
              <option value="Dark 'N' Stormy">Dark 'N' Stormy</option>
              <option value="El Presidente">El Presidente</option>
              <option value="Fish House Punch">Fish House Punch</option>
              <option value="Flaming Dr Pepper">Flaming Dr Pepper</option>
              <option value="Flaming Volcano">Flaming Volcano</option>
              <option value="Fluffy Critter">Fluffy Critter</option>
              <option value="Grog">Grog</option>
              <option value="Gunfire">Gunfire</option>
              <option value="Hot buttered rum">Hot buttered rum</option>
              <option value="Hurricane">Hurricane</option>
              <option value="Jagertee">Jagertee</option>
              <option value="Long Island Iced Tea">Long Island Iced Tea</option>
              <option value="Macuá">Macuá</option>
              <option value="Mai-Tai">Mai-Tai</option>
              <option value="Mojito">Mojito</option>
              <option value="Painkiller">Painkiller</option>
              <option value="Piña Colada">Piña Colada</option>
              <option value="Planter's Punch">Planter's Punch</option>
              <option value="Royal Bermuda Cocktail">Royal Bermuda Cocktail</option>
              <option value="Rum Swizzle">Rum Swizzle</option>
              <option value="Ti' Punch">Ti' Punch</option>
              <option value="Tom and Jerry">Tom and Jerry</option>
              <option value="Tschunk">Tschunk</option>
              <option value="Yellow Bird">Yellow Bird</option>
              <option value="Zombie">Zombie</option>
            </optgroup>
            <optgroup label="Tequila"><option value="Bloody Aztec">Bloody Aztec</option>
              <option value="Chimayó Cocktail">Chimayó Cocktail</option>
              <option value="El Toro Loco Patron and Redbull">El Toro Loco Patron and Redbull</option>
            </optgroup>
            <optgroup label="My Group"><option value="Juan Collins">Juan Collins</option>
              <option value="Long Island Iced Tea">Long Island Iced Tea</option>
              <option value="Margarita">Margarita</option>
              <option value="Matador">Matador</option>
              <option value="Paloma">Paloma</option>
              <option value="Slammer Royale">Slammer Royale</option>
              <option value="Tequila Sunrise">Tequila Sunrise</option>
              <option value="Vampiro">Vampiro</option>
            </optgroup>
            <optgroup label="Vodka"><option value="Agent Orange">Agent Orange</option>
              <option value="Apple Martini">Apple Martini</option>
              <option value="Astro pop">Astro pop</option>
              <option value="Batida">Batida</option>
              <option value="Bay Breeze">Bay Breeze</option>
              <option value="Blue Lagoon">Blue Lagoon</option>
              <option value="Bull Shot">Bull Shot</option>
              <option value="Caesar">Caesar</option>
              <option value="Caipivodka">Caipivodka</option>
              <option value="Cape Cod">Cape Cod</option>
              <option value="Chi-Chi">Chi-Chi</option>
              <option value="Colombia">Colombia</option>
              <option value="Fizzy apple cocktail">Fizzy apple cocktail</option>
              <option value="Flirtini">Flirtini</option>
              <option value="Gimlet">Gimlet</option>
              <option value="Glowtini">Glowtini</option>
              <option value="Harrogate Nights">Harrogate Nights</option>
              <option value="Hi-fi">Hi-fi</option>
              <option value="Kensington Court Special">Kensington Court Special</option>
              <option value="Kremlin Colonel">Kremlin Colonel</option>
              <option value="Lemon Drop">Lemon Drop</option>
              <option value="Lime Rickey">Lime Rickey</option>
              <option value="Link Up">Link Up</option>
              <option value="Mudslide">Mudslide</option>
              <option value="Orange Tundra">Orange Tundra</option>
              <option value="Paralyzer">Paralyzer</option>
              <option value="Red Lotus">Red Lotus</option>
              <option value="Red Russian">Red Russian</option>
              <option value="Rose Kennedy Cocktail">Rose Kennedy Cocktail</option>
              <option value="Salmiakki Koskenkorva">Salmiakki Koskenkorva</option>
              <option value="Salty Dog">Salty Dog</option>
              <option value="Vodka Gimlet">Vodka Gimlet</option>
              <option value="Vodka Martini">Vodka Martini</option>
              <option value="Vodka McGovern">Vodka McGovern</option>
              <option value="Vodka Sunrise">Vodka Sunrise</option>
              <option value="White Russian">White Russian</option>
            </optgroup>
            <optgroup label="Whisky"><option value="Amber Moon">Amber Moon</option>
              <option value="Blue Blazer">Blue Blazer</option>
              <option value="Black Nail">Black Nail</option>
              <option value="Bobby Burns">Bobby Burns</option>
              <option value="Boulevardier">Boulevardier</option>
              <option value="Bourbon Lancer">Bourbon Lancer</option>
              <option value="Brooklyn">Brooklyn</option>
              <option value="Churchill">Churchill</option>
              <option value="Farnell">Farnell</option>
              <option value="Horsefeather">Horsefeather</option>
              <option value="Jack and Coke">Jack and Coke</option>
              <option value="Jungle Juice">Jungle Juice</option>
              <option value="Lynchburg Lemonade">Lynchburg Lemonade</option>
              <option value="Missouri Mule">Missouri Mule</option>
              <option value="Nixon">Nixon</option>
              <option value="Rob Roy">Rob Roy</option>
              <option value="Scotch and Soda">Scotch and Soda</option>
              <option value="Seven and Seven">Seven and Seven</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div class="example">
        <h1>Example with custom token markup (click tokens to remove)</h1>

        <div class="container">
          <p class="current"><strong>Current Value:</strong> {{selected_custom_token}}</p>
          <label class="input-label">Choose One</label>
          <v-multiselect :options="options" :allow-suggest="true" placeholder="Search for a Cocktail" v-model="selected_custom_token">
            <div slot="token" slot-scope="{ option, remove }" @click="remove()" v-html="`${option.item} ${option.extra || ''}`"></div>
          </v-multiselect>
        </div>

        <div class="container">
          <p class="current"><strong>Current Value:</strong> {{selected_native_token}}</p>
          <label class="input-label">Choose One</label>
          <select multiple="multiple" v-model="selected_native_token">
            <optgroup label="Rum">
              <option value="Blue Hawaii">Blue Hawaii</option>
              <option value="Brass Monkey">Brass Monkey</option>
              <option value="Bumbo">Bumbo</option>
              <option value="Bushwacker">Bushwacker</option>
              <option value="Caribou Lou">Caribou Lou</option>
              <option value="Cojito">Cojito</option>
              <option value="Cremat">Cremat</option>
              <option value="Cuba Libre">Cuba Libre</option>
              <option value="Cuban Sunset">Cuban Sunset</option>
              <option value="Daiquiri">Daiquiri</option>
              <option value="Dark 'N' Stormy">Dark 'N' Stormy</option>
              <option value="El Presidente">El Presidente</option>
              <option value="Fish House Punch">Fish House Punch</option>
              <option value="Flaming Dr Pepper">Flaming Dr Pepper</option>
              <option value="Flaming Volcano">Flaming Volcano</option>
              <option value="Fluffy Critter">Fluffy Critter</option>
              <option value="Grog">Grog</option>
              <option value="Gunfire">Gunfire</option>
              <option value="Hot buttered rum">Hot buttered rum</option>
              <option value="Hurricane">Hurricane</option>
              <option value="Jagertee">Jagertee</option>
              <option value="Long Island Iced Tea">Long Island Iced Tea</option>
              <option value="Macuá">Macuá</option>
              <option value="Mai-Tai">Mai-Tai</option>
              <option value="Mojito">Mojito</option>
              <option value="Painkiller">Painkiller</option>
              <option value="Piña Colada">Piña Colada</option>
              <option value="Planter's Punch">Planter's Punch</option>
              <option value="Royal Bermuda Cocktail">Royal Bermuda Cocktail</option>
              <option value="Rum Swizzle">Rum Swizzle</option>
              <option value="Ti' Punch">Ti' Punch</option>
              <option value="Tom and Jerry">Tom and Jerry</option>
              <option value="Tschunk">Tschunk</option>
              <option value="Yellow Bird">Yellow Bird</option>
              <option value="Zombie">Zombie</option>
            </optgroup>
            <optgroup label="Tequila"><option value="Bloody Aztec">Bloody Aztec</option>
              <option value="Chimayó Cocktail">Chimayó Cocktail</option>
              <option value="El Toro Loco Patron and Redbull">El Toro Loco Patron and Redbull</option>
            </optgroup>
            <optgroup label="My Group"><option value="Juan Collins">Juan Collins</option>
              <option value="Long Island Iced Tea">Long Island Iced Tea</option>
              <option value="Margarita">Margarita</option>
              <option value="Matador">Matador</option>
              <option value="Paloma">Paloma</option>
              <option value="Slammer Royale">Slammer Royale</option>
              <option value="Tequila Sunrise">Tequila Sunrise</option>
              <option value="Vampiro">Vampiro</option>
            </optgroup>
            <optgroup label="Vodka"><option value="Agent Orange">Agent Orange</option>
              <option value="Apple Martini">Apple Martini</option>
              <option value="Astro pop">Astro pop</option>
              <option value="Batida">Batida</option>
              <option value="Bay Breeze">Bay Breeze</option>
              <option value="Blue Lagoon">Blue Lagoon</option>
              <option value="Bull Shot">Bull Shot</option>
              <option value="Caesar">Caesar</option>
              <option value="Caipivodka">Caipivodka</option>
              <option value="Cape Cod">Cape Cod</option>
              <option value="Chi-Chi">Chi-Chi</option>
              <option value="Colombia">Colombia</option>
              <option value="Fizzy apple cocktail">Fizzy apple cocktail</option>
              <option value="Flirtini">Flirtini</option>
              <option value="Gimlet">Gimlet</option>
              <option value="Glowtini">Glowtini</option>
              <option value="Harrogate Nights">Harrogate Nights</option>
              <option value="Hi-fi">Hi-fi</option>
              <option value="Kensington Court Special">Kensington Court Special</option>
              <option value="Kremlin Colonel">Kremlin Colonel</option>
              <option value="Lemon Drop">Lemon Drop</option>
              <option value="Lime Rickey">Lime Rickey</option>
              <option value="Link Up">Link Up</option>
              <option value="Mudslide">Mudslide</option>
              <option value="Orange Tundra">Orange Tundra</option>
              <option value="Paralyzer">Paralyzer</option>
              <option value="Red Lotus">Red Lotus</option>
              <option value="Red Russian">Red Russian</option>
              <option value="Rose Kennedy Cocktail">Rose Kennedy Cocktail</option>
              <option value="Salmiakki Koskenkorva">Salmiakki Koskenkorva</option>
              <option value="Salty Dog">Salty Dog</option>
              <option value="Vodka Gimlet">Vodka Gimlet</option>
              <option value="Vodka Martini">Vodka Martini</option>
              <option value="Vodka McGovern">Vodka McGovern</option>
              <option value="Vodka Sunrise">Vodka Sunrise</option>
              <option value="White Russian">White Russian</option>
            </optgroup>
            <optgroup label="Whisky"><option value="Amber Moon">Amber Moon</option>
              <option value="Blue Blazer">Blue Blazer</option>
              <option value="Black Nail">Black Nail</option>
              <option value="Bobby Burns">Bobby Burns</option>
              <option value="Boulevardier">Boulevardier</option>
              <option value="Bourbon Lancer">Bourbon Lancer</option>
              <option value="Brooklyn">Brooklyn</option>
              <option value="Churchill">Churchill</option>
              <option value="Farnell">Farnell</option>
              <option value="Horsefeather">Horsefeather</option>
              <option value="Jack and Coke">Jack and Coke</option>
              <option value="Jungle Juice">Jungle Juice</option>
              <option value="Lynchburg Lemonade">Lynchburg Lemonade</option>
              <option value="Missouri Mule">Missouri Mule</option>
              <option value="Nixon">Nixon</option>
              <option value="Rob Roy">Rob Roy</option>
              <option value="Scotch and Soda">Scotch and Soda</option>
              <option value="Seven and Seven">Seven and Seven</option>
            </optgroup>
          </select>
        </div>
      </div>

      <p>Etiam velit massa, pharetra eget felis in, venenatis mattis ex. Sed tempor, erat sed interdum bibendum, ex urna gravida sapien, vitae semper eros enim sed turpis. Etiam lacinia cursus tellus, eget imperdiet mi aliquam sit amet. Duis venenatis sapien et elit eleifend, id posuere enim vulputate. Quisque aliquam pretium tellus in efficitur. Etiam pharetra ex id dui bibendum, sit amet convallis lorem aliquet. Etiam varius, arcu a sagittis aliquam, metus enim semper arcu, eu rhoncus tortor lectus a arcu. Integer aliquet porta nibh ac facilisis. Aliquam odio ex, iaculis vel lobortis ut, volutpat et massa. Vestibulum sed congue justo. In scelerisque nec ipsum vel porta. Suspendisse viverra, arcu at ullamcorper fringilla, nibh lacus sollicitudin velit, sed malesuada ligula odio quis augue. Sed sapien urna, imperdiet eget purus et, bibendum pulvinar arcu. In a fermentum ex. Integer in felis sem.</p>
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas ornare consequat imperdiet. Cras sed lorem ut erat gravida laoreet ut sagittis sem. Nam tempor, neque vel maximus lobortis, mauris est bibendum metus, nec faucibus purus nisl nec augue. Aenean suscipit tortor mattis tellus dictum feugiat at sed leo. Aliquam facilisis tempus erat eu efficitur. Maecenas ornare augue ac ante lobortis tincidunt. Aliquam nec blandit nunc. Proin malesuada magna ut risus consectetur vulputate. Maecenas vitae mollis augue. Pellentesque accumsan enim imperdiet tellus lobortis, vel lacinia ligula luctus.</p>
      <p>Aenean eleifend nibh vel lobortis efficitur. Aliquam in convallis tellus, a maximus dui. Aenean iaculis, ligula in finibus posuere, nulla est consequat mi, vel rhoncus odio velit finibus diam. Praesent tempor, justo sed varius gravida, libero quam fringilla quam, quis vehicula felis dui et libero. Aliquam in turpis in mi imperdiet gravida. Sed ante enim, ultrices non lorem volutpat, mattis bibendum sapien. Phasellus molestie augue in velit lacinia consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius in leo feugiat convallis. Pellentesque nec ultrices nunc. Nulla vitae congue orci.</p>
      <p>Praesent lacinia tortor sit amet scelerisque laoreet. Proin laoreet tempor leo sed rutrum. Sed ut ultrices leo. Aliquam elementum massa in odio ullamcorper, sed venenatis purus dictum. Quisque aliquam augue vitae ultricies tristique. Duis diam dolor, auctor non lectus quis, rutrum accumsan libero. Vestibulum id sapien velit. Phasellus dolor est, facilisis non consequat vel, fermentum vitae magna.</p>
      <p>Sed sagittis ipsum ante, et bibendum mi pellentesque vel. Vivamus molestie molestie aliquam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce scelerisque elit non ante porta, in ullamcorper lorem efficitur. Fusce a viverra sem. Curabitur eu lectus ultricies justo ornare pellentesque vel in nulla. Praesent eu venenatis nibh, rutrum cursus nisi. Donec facilisis id magna vel tristique.</p>
      <p>Mauris risus velit, ornare a eros auctor, volutpat pretium lorem. Duis in aliquet ligula. Sed efficitur efficitur ex, eu tincidunt arcu commodo a. Maecenas commodo tortor id pretium efficitur. Morbi fermentum purus vitae congue aliquet. Mauris bibendum, velit vitae pellentesque porta, diam ante semper eros, nec euismod felis ligula id neque. Integer ex libero, convallis ac nibh at, dictum dapibus lacus. Duis congue imperdiet turpis condimentum lobortis. Curabitur vitae felis ipsum. Sed molestie euismod suscipit. Nam luctus vitae est eget tincidunt. Aenean ornare vulputate tortor vel tempor. Cras dapibus massa eu quam pellentesque, quis ultrices ante volutpat. Nullam non faucibus nulla. Nunc pharetra mi sapien, a tincidunt dui pharetra sit amet. Nam in facilisis purus, sit amet mattis quam.</p>
      <p>Donec condimentum, odio id pretium porta, urna justo ornare diam, eu finibus nibh leo pretium arcu. Etiam leo orci, malesuada ut tincidunt ut, tincidunt non libero. Nam fermentum mi sed urna finibus, in aliquet quam tincidunt. Nulla feugiat consectetur nulla quis pellentesque. Duis in sodales enim. Phasellus mollis, erat at mollis sodales, arcu lectus imperdiet lacus, id tristique ipsum orci a enim. Etiam est lectus, tristique a eleifend non, cursus vel erat. Duis ullamcorper ante ac est laoreet ornare. Sed viverra a sem quis tincidunt.</p>
      <p>Suspendisse tempus nec mauris vitae sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla molestie accumsan mauris, nec consectetur est fermentum id. Maecenas in gravida orci. Suspendisse quis nulla vitae elit rhoncus eleifend. Nullam et sapien id mauris varius porttitor vel sit amet tortor. Integer bibendum leo eget nulla pretium fringilla. Proin turpis sapien, mattis a massa nec, malesuada scelerisque arcu. Aenean odio turpis, maximus sed nisl ac, consequat venenatis nunc.</p>
    </div>
  </div>
</template>

<script>
import VMultiselect from '@/multiselect.vue'

import States from './data/states.json'
import Countries from './data/countries.json'
import Cocktails from './data/cocktails.json'

export default {
  name: 'app',
  components: { VMultiselect },
  methods: {
    onChange: function(val){
      console.log('Value:', val)
    }
  },
  data: function(){
    return {
      options: Cocktails,
      selected_custom: null,
      selected_custom_option: null,
      selected_custom_token: null,
      selected_native: [],
      selected_native_option: [],
      selected_native_token: []
    }
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 150px 0;
  font-size: 14px;
}

.wrapper {
  width: 60%;
  margin: 0 auto;
  padding: 15px;
  overflow: auto;
  max-height: 600px;
  border: 1px solid #ccc;
}

.wrapper p {
  text-align: left;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.example {
  margin-top: 2rem;
}

.example .current {
  font-size: 14px;
}

h1 {
  font-size: 20px;
}

.container {
  text-align: left;
  display: inline-block;
  min-width: 300px;
  vertical-align: top;
  margin-right: 30px;
}

.input-label {
  display: block;
  font-size: 13px;
  font-weight: bold;
}

/*
.v-select {
  max-width: 100px;
}

.v-select .options {
  font-size: 13px;
}

.v-optgroup .label {
  font-weight: bold;
}

select {
  max-width: 100px;
}
*/

@media only screen and (max-width: 800px) {
  #app {
    margin: 50px 0;
  }

  .wrapper {
    width: 80%;
  }
}
</style>
