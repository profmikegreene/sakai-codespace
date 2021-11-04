/*
 * This file is part of "SnipSnap Radeox Rendering Engine".
 *
 * Copyright (c) 2002 Stephan J. Schmidt, Matthias L. Jugel
 * All Rights Reserved.
 *
 * Please visit http://radeox.org/ for updates and contact.
 *
 * --LICENSE NOTICE--
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * --LICENSE NOTICE--
 */

package org.radeox.macro;

import java.io.IOException;
import java.io.Writer;

import lombok.extern.slf4j.Slf4j;
import org.radeox.api.macro.MacroParameter;
import org.radeox.macro.api.ApiDoc;

/*
 * Lists all known API documentation repositories and mappings @author stephan
 * @team sonicteam
 * 
 * @version $Id$
 */
@Slf4j
public class ApiDocMacro extends BaseLocaleMacro
{

	private String[] paramDescription = {};

	public String[] getParamDescription()
	{
		return paramDescription;
	}

	public String getLocaleKey()
	{
		return "macro.apidocs";
	}

	public void execute(Writer writer, MacroParameter params)
			throws IllegalArgumentException, IOException
	{
		ApiDoc apiDoc = ApiDoc.getInstance();
		apiDoc.appendTo(writer);
		return;
	}
}
